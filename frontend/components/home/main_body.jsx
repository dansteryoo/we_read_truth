import React from 'react';
import axios from 'axios';
import { regBibleTitles, maxMcLeanBooks } from './function_helpers/bookTitles'

class MainBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarkId: '',
            gender: '',
            book: '',
            id: null,
            title: '',
            passages: [],
            summary: '', 
            img: '',
            esvPassage: [],
            mainBodyChanged: false,
            bookmark: false,
            renderDay: null,
            width: 0,
            height: 0
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.myRef = React.createRef();
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.splitPassages = this.splitPassages.bind(this);
        this.isMainBodyDevoNull = this.isMainBodyDevoNull.bind(this);
        this.checkUserBookmark = this.checkUserBookmark.bind(this);
    };

    //---------- ESV.ORG API CALL ----------//

    ESVpassageGetter(passage) {

        axios.get('https://api.esv.org/v3/passage/text/?', {
            crossDomain: true,
            params: {
                'q': passage,
                'include-headings': false,
                'include-footnotes': false,
                'include-verse-numbers': false,
                'include-short-copyright': false,
                'include-passage-references': false
            },
            headers: {
                'Authorization': window.esvAPIKey,
            }
        })
        .then(res => {
            if (res.status === 200) {
                return this.setState({ 
                    esvPassage: [ ...this.state.esvPassage, 
                        { 
                        passage: res.config.params.q, 
                        text: res.data.passages[0] 
                        }
                    ]
                })
            } else {
                return 'Error: Passage not found'
            }
        })
    }

    splitPassages(passages) {
        if (passages.length !== 0) return passages.split(', ')
    }

    isMainBodyDevoNull() {
        return this.props.mainBodyDevo === null
    }

    checkUserBookmark() {
        const { bookmark } = this.props.currentUser
        return bookmark !== undefined && bookmark !== null
    }


    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {
        window.addEventListener('resize', 
            this.setState({ width: window.innerWidth, height: window.innerHeight })
        );

        const { currentUser, fetchDevo, fetchBookmark } = this.props

        if (this.checkUserBookmark()) {
            return fetchDevo(currentUser.bookmark.devo_id)
                .then(() => this.setState({
                    renderDay: currentUser.bookmark.render_day,
                    bookmark: true
                }))
        } else {
            return fetchBookmark()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', 
            this.setState({ width: window.innerWidth, height: window.innerHeight })
        );
    }

    componentDidUpdate(prevProps) {
        if (this.isMainBodyDevoNull()) return 
        console.log('update');
        //---------- SET renderDay to this.state ----------//
        if (this.renderDay() && this.renderDay() !== this.state.renderDay) {
            this.setState({ renderDay: this.renderDay() })
        }
        //---------- PREVENTS MULTIPLE this.setState on update ----------//
        if (this.state.mainBodyChanged) {
            this.setState({ mainBodyChanged: false })
        }

        if (prevProps !== this.props) {
            if (!this.state.renderDay) {
                this.setState({ renderDay: this.props.bookmark.render_day })  
            }
        }

        //---------- UPDATES new mainBodyDevo ----------//
        if (prevProps.mainBodyDevo !==  this.props.mainBodyDevo) {
            const { id, img, passages, summary, title, gender, book } = this.props.mainBodyDevo;

            //---------- SCROLL TO TOP on render ----------//
            this.myRef.current.scrollTo(0, 0);

            //---------- PREVENTS DUPS in esvPassage ----------//
            this.setState({ esvPassage: [] });
            
            this.splitPassages(passages).forEach(each => {
                return this.ESVpassageGetter(each.trim())
            });

            this.setState({
                id, img, passages, summary, title, gender, book,
                mainBodyChanged: true
            })

            id === this.props.bookmark.devo_id
                ? this.setState({ bookmark: true })
                : this.setState({ bookmark: false })
        }

        if (this.props.bookmark.id !== this.state.bookmarkId) {
            this.setState({ bookmarkId: this.props.bookmark.id })
        }
    }

    //---------- RENDER FUNCTIONS ----------//

    renderPassages() {
        const { passages, esvPassage } = this.state; 
        if (passages.length < 1) return 

        let esvSortMatch = []
        const passagesArray = this.splitPassages(passages)

        if (esvPassage.length === passagesArray.length) {
            esvSortMatch = esvPassage.sort(function(a, b) {
                return passagesArray.indexOf(a.passage) - passagesArray.indexOf(b.passage)
            })
        }

        //---------- CATCH undefined ESV API returns ----------//
        let newEsvData = esvSortMatch.filter((ele, i) => {
            if (ele.text === undefined) {
                console.log(`ESV PASSAGE ERROR IN: 
                    index(${i}), 
                    passage(${JSON.stringify(ele.passage)}), 
                    text(${JSON.stringify(ele.text)})`
                )
                return 
            }
            return ele
        })

        return (
            newEsvData.map((each, i) => {
        
        //---------- itemCount TRACKING each item ----------//
            const itemCount = []
            let eachText = each.text.split('\n').map((item, j) => {
        
        //---------- itemCount.push STORES each item into itemCount ----------//
                itemCount.push(item.trim())

        //---------- checking if prevItem !== current item ----------//
                if (itemCount[j - 1] !== item.trim()) {
                    return <p key={'bible-text' + j}>{item}<br /></p>
                }
            });
            
            return (
                <li key={'esv-passages' + i}>
                    <span className="bible-passage">{each.passage}</span>
                    <br /><br />
                    {eachText}
                </li>
            )
        }))
    }

    renderSummary() {
        const eleCount = []

        return (
            this.state.summary.split('\n').map((ele, i) => {
                const scripture = ele.slice(0, 17) === "Scripture Reading"
                const text = ele.slice(0, 5) === "Text:"
                const eleCountMatch = eleCount[i - 1] === ele.trim()

                //---------- eleCount.push STORES each item into eleCount ----------//
                scripture || text
                    ? eleCount.push("")
                    : eleCount.push(ele.trim())

                if (!eleCountMatch && !scripture && !text) {
                    return <li key={'summary' + i}>
                        <p>{ele}<br /></p>
                        </li>
                }
            })
        )
    }

    renderDay() {
        let renderDay; 
            this.props.devoBook.forEach((each, i) => {
                if (each.id === this.state.id) {
                    renderDay = i + 1
                }
            })
        return renderDay
    }

    toggleBookmark() {
        const { bookmark, id, renderDay, gender, book } = this.state
        const { currentUser, createBookmark, deleteBookmark } = this.props

        let bookmarkData = { 
            gender, 
            book,
            user_id: currentUser.id, 
            devo_id: id,
            render_day: renderDay,
        }
        console.log(this.props.bookmark)
        !bookmark
            ? createBookmark(bookmarkData)
            : deleteBookmark(this.props.bookmark.id)

        this.setState({ bookmark: !bookmark })
    }

    toggleAudio() {
        const { width, height, esvPassage } = this.state
        const passageSplit = esvPassage[0].passage.split(' ')

        const checkForNumber = (data) => {
            return data.match(/^([1-9]|[1-8][0-9]|9[0-9]|1[0-4][0-9]|150)$/g)
        }

        let book = passageSplit[0]
        let chapter = passageSplit[passageSplit.length - 1].split(':')[0]

        if (checkForNumber(book)) {
            book = `${book} ${passageSplit[1]}`
        } else if (book === 'Song') {
            book = 'Song of Songs'
        }

        let bookName = maxMcLeanBooks[regBibleTitles.indexOf(book)]
        let theURL = `https://www.biblegateway.com/audio/mclean/esv/${bookName}.${chapter}`
        let winName = 'Max McLean Audio'
        let winParams = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
            width=${Math.floor(width / 1.4)},
            height=${Math.floor(height / 2.2)},
            left=100,top=100`;

        bookName === undefined
            ? false 
            : window.open(theURL, winName, winParams);
    }

    render() {
        if (this.isMainBodyDevoNull()) return <div></div>
        
        return (
            <div className='middle-container'>
                <div className='devo-main-title'>
                    <span className='devo-main-day'>Day {this.state.renderDay}:</span>
                    <span>{this.state.title}</span>
                        <i id='bookmark' 
                        className={this.state.bookmark ? 'fa fa-bookmark' : 'fa fa-bookmark-o' } 
                        onClick={() => this.toggleBookmark()} 
                        aria-hidden="true">
                        </i>
                        <i id='max-mclean-audio' className="fa fa-volume-up"
                            onClick={() => this.toggleAudio()}
                            aria-hidden="true">
                        </i>
                </div>
            <div className='devo-main-container' ref={this.myRef}>
                <div className="form-or-separator-mainbody-passages">
                    <hr />
                </div>
                <div className='devo-main-passages'>
                    
                    <span>{this.renderPassages()}</span>

                </div>
                <div className="form-or-separator-mainbody-summary">
                    <hr />
                </div>
                <div className="devo-main-body">

                    <span>{this.renderSummary()}</span>

                </div>
                <div className="form-or-separator-mainbody-image">
                    <hr />
                </div>
                <div className='devo-main-image'>
                    <img src={this.state.img}/>
                </div>
                <div className='devo-main-footer'>
                    <span>{}</span>
                </div>
            </div>
        </div>
        )
    };
}

export default MainBody;