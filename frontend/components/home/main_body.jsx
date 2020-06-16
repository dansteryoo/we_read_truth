import React from 'react';
import axios from 'axios';

class MainBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.myRef = React.createRef();
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.splitPassages = this.splitPassages.bind(this);
        this.isMainBodyDevoNull = this.isMainBodyDevoNull.bind(this);
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

    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {
        const { bookmark } = this.props.currentUser

        //---------- IF localStorage EXISTS then setState ----------//
        if (bookmark) {
            return this.props.fetchDevo(bookmark.devo_id)
                .then(() => this.setState({ 
                    renderDay: bookmark.render_day,
                    bookmark: true 
                }))
        }
    };

    componentDidUpdate(prevProps) {
        if (this.isMainBodyDevoNull()) return 

        //---------- SET renderDay to this.state ----------//
        if (this.renderDay() && this.renderDay() !== this.state.renderDay) {
            this.setState({ renderDay: this.renderDay() })
        }
        //---------- PREVENTS MULTIPLE this.setState on update ----------//
        if (this.state.mainBodyChanged) {
            this.setState({ mainBodyChanged: false });
        }

        if (this.props.mainBodyDevo !== prevProps.mainBodyDevo) {
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
                mainBodyChanged: true,
                bookmark: false,
            })
        }
    };

    componentWillUnmount() {

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
        const { bookmark, id, renderDay } = this.state;

        let bookmarkData = {
            user_id: this.props.currentUser.id, 
            devo_id: id,
            render_day: renderDay
        }
        console.log(bookmarkData)
        console.log(this.state)
        console.log(this.props.currentUser)

        this.props.updateBookmark(bookmarkData)
        this.setState({ bookmark: !bookmark })
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