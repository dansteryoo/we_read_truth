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
            id: '',
            title: '',
            passages: [],
            summary: '',
            img: '',
            esvPassage: [],
            mainBodyChanged: false,
            bookmark: false,
            renderDay: '',
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.myRef = React.createRef();
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.isMainBodyDevoNull = this.isMainBodyDevoNull.bind(this);
        this.userBookmarkBlank = this.userBookmarkBlank.bind(this);
        this.setBookmark = this.setBookmark.bind(this);
        this.localStorageFunc = this.localStorageFunc.bind(this);
        this.splitPassages = this.splitPassages.bind(this);
        this.isValidNumber = this.isValidNumber.bind(this);

    };

    //---------- ESV.ORG API CALL ----------//

    ESVpassageGetter(passage) {
        const esvKeys = [
            window.esv_one,
            window.esv_two,
            window.esv_three,
            window.esv_four,
            window.esv_five,
            window.esv_six,
        ]
        let randomGen = esvKeys[Math.floor(Math.random() * esvKeys.length)];

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
                'Authorization': randomGen,
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

    setBookmark() {
        //---------- SET BOOKMARK TO TRUE ----------//
        if (!this.state.bookmark && this.state.mainBodyChanged) {
            if (this.localStorageFunc('getCurrentPage')
                && this.localStorageFunc('getCurrentPage').id === this.state.id) {
                return this.setState({ bookmark: true })
            }
        }
    }

    isValidNumber(number) {
        return typeof number === 'number'
    }

    splitPassages(passages) {
        if (passages.length !== 0) return passages.split(', ')
    }

    isMainBodyDevoNull() {
        return this.props.mainBodyDevo === null
    }

    userBookmarkBlank() {
        const { bookmark } = this.props.currentUser
        return bookmark == (undefined || null)
    }

    localStorageFunc(condition) {
        let userId = JSON.stringify(this.props.currentUser.id)

        switch (condition) {
            case 'getCurrentPage':
                return JSON.parse(localStorage.getItem(userId))

            case 'setCurrentPage':
                return localStorage.setItem(userId, JSON.stringify(this.state))

            case 'removeCurrentPage':
                return localStorage.removeItem(userId);

            default:
                return
        }
    }


    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {
        this.setBookmark()
        const currentPage = this.localStorageFunc('getCurrentPage')
        const { currentUser, fetchDevo } = this.props

        //---------- IF localStorage EXISTS then setState ----------//
        if (currentPage) {
            return fetchDevo(currentPage.id)
                .then(() => this.setState({
                    renderDay: currentPage.render_day,
                    bookmarkId: currentPage.bookmarkId,
                    bookmark: true
                })) 

        } else if (!this.userBookmarkBlank()) {
            return fetchDevo(currentUser.bookmark.devo_id)
                .then(() => this.setState({
                    renderDay: currentUser.bookmark.render_day,
                    bookmarkId: currentUser.bookmark.id,
                    bookmark: true
                 }))
        } 
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps) {
        this.setBookmark()
        const { bookmark, mainBodyDevo, currentUser } = this.props
        const { bookmarkId, id, renderDay, mainBodyChanged } = this.state
        const bookmarkBlank = Object.values(bookmark).length < 1

        if (this.isMainBodyDevoNull()) return 

        //---------- SET bookmarkId === bookmark.id ----------//
        !bookmarkBlank && bookmarkId !== bookmark.id && id === bookmark.devo_id
            && this.setState({ bookmarkId: bookmark.id })

        //---------- SET bookmarkId === currentUser.bookmark.id ----------//
        !this.isValidNumber(bookmarkId) && bookmarkBlank && currentUser.bookmark 
        && bookmarkId !== currentUser.bookmark.id
            && this.setState({ bookmarkId: currentUser.bookmark.id })

        //---------- SET renderDay to this.renderDay() ----------//
        this.renderDay() && this.renderDay() !== renderDay
            && this.setState({ renderDay: this.renderDay() }) 

        //---------- PREVENTS MULTIPLE this.setState on update ----------//
        mainBodyChanged 
            && this.setState({ mainBodyChanged: false })

        //---------- UPDATES new mainBodyDevo ----------//
        if (prevProps.mainBodyDevo !== mainBodyDevo) {
            const { id, img, passages, summary, title, gender, book } = mainBodyDevo

            //---------- SCROLL TO TOP on render ----------//
            this.myRef.current.scrollTo(0, 0);

            //---------- PREVENTS DUPS in esvPassage ----------//
            this.setState({ esvPassage: [] });
            
            Promise.all(this.splitPassages(passages)
                .map(each => this.ESVpassageGetter(each.trim())))

            this.setState({
                id, img, passages, summary, title, gender, book,
                mainBodyChanged: true, 
                bookmark: false,
            })
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
                const eleCountMatch = eleCount[i - 1] === ele.trim() && ele.trim().length < 1

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
        const { bookmark, id, renderDay, gender, book, bookmarkId } = this.state
        const { currentUser, createBookmark, deleteBookmark } = this.props

        let bookmarkData = { 
            gender, 
            book,
            user_id: currentUser.id, 
            devo_id: id,
            render_day: renderDay,
        }

        if (bookmark) {
            deleteBookmark(bookmarkId)
            this.localStorageFunc('removeCurrentPage')
        } else {
            createBookmark(bookmarkData)
        }

        this.setState({ bookmark: !bookmark })
    }

    toggleAudio() {
        const { esvPassage } = this.state
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
            width=700,height=350,left=100,top=100`;

        bookName !== undefined
            && window.open(theURL, winName, winParams)
    }

    render() {
        if (this.isMainBodyDevoNull() && !this.localStorageFunc('getCurrentPage')) return <div></div>
        
        this.state.bookmark && this.isValidNumber(this.state.bookmarkId)
            && this.localStorageFunc('setCurrentPage')
        
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