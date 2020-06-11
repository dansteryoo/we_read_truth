import React from 'react';
import axios from 'axios';
import { ESVAPI, API_URL } from '../../../esv';

class MainBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            passages: [],
            summary: '', 
            img: '',
            esvPassage: [],
            mainBodyChanged: false,
            bookmark: false,
            renderDay: ''
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.myRef = React.createRef();
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.splitPassages = this.splitPassages.bind(this);
        this.isMainBodyDevoNull = this.isMainBodyDevoNull.bind(this);
        this.getCurrentPage = this.getCurrentPage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.removeCurrentPage = this.removeCurrentPage.bind(this);
        this.setBookmark = this.setBookmark.bind(this);
        this.stringifyCurrentUserId = this.stringifyCurrentUserId.bind(this);
    };

    //---------- ESV.ORG API CALL ----------//

    ESVpassageGetter(passage) {
        axios.get(API_URL, {
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
                'Authorization': ESVAPI,
            }
        })
        .then(res => {
            if (res.status === 200) {
                return this.setState({ 
                    esvPassage: [ 
                        ...this.state.esvPassage, 
                        { 
                        passage: res.config.params.q, 
                        text: res.data.passages[0] 
                        }
                    ]
                }
            )
            } else {
                return 'Error: Passage not found'
            }
        })
    }

    setBookmark() {
        //---------- SET BOOKMARK TO TRUE ----------//
        if (!this.state.bookmark && this.state.mainBodyChanged) {
            if (this.getCurrentPage() && this.getCurrentPage().id === this.state.id) {
                return this.setState({ bookmark: true })
            }
        }
    }

    splitPassages(passages) {
        if (passages.length !== 0) return passages.split(', ')
    }

    isMainBodyDevoNull() {
        if (this.props.mainBodyDevo === null) return true 
        return false
    }

    stringifyCurrentUserId() {
        return JSON.stringify(this.props.currentUser.id)
    }

    getCurrentPage() {
        return JSON.parse(localStorage.getItem(this.stringifyCurrentUserId()));
    }

    setCurrentPage() {
        console.log(this.state)
        return localStorage.setItem(this.stringifyCurrentUserId(), JSON.stringify(this.state))
    }

    removeCurrentPage() {
        return localStorage.removeItem(this.stringifyCurrentUserId());
    }

    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {
        this.setBookmark()
        //---------- IF localStorage EXISTS then setState ----------//
        if (this.getCurrentPage()) {
            this.setState({ renderDay: this.getCurrentPage().renderDay })
            return this.props.fetchDevo(this.getCurrentPage().id);
        }
    };

    componentDidUpdate(prevProps) {
        this.setBookmark()
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
            const { id, img, passages, summary, title } = this.props.mainBodyDevo;

            //---------- SCROLL TO TOP on render ----------//
            this.myRef.current.scrollTo(0, 0);

            //---------- PREVENTS DUPS in esvPassage ----------//
            this.setState({ esvPassage: [] });
            
            this.splitPassages(passages).forEach(each => {
                return this.ESVpassageGetter(each.trim())
            });

            this.setState({
                id, title, passages, summary, img,
                mainBodyChanged: true,
                bookmark: false,
            })
        }
    };


    //---------- RENDER FUNCTIONS ----------//

    renderPassages() {
        const { passages, esvPassage } = this.state; 
        if (passages.length === 0) return 

        let newEsvData = []
        let passagesArray = this.splitPassages(passages)

        if (esvPassage.length === passagesArray.length) {
            newEsvData = esvPassage.sort(function(a, b) {
                return passagesArray.indexOf(a.passage) - passagesArray.indexOf(b.passage)
            })
        }

        return (
            newEsvData.map((each, i) => {
        
        //---------- itemCount TRACKING each item ----------//
            let itemCount = []
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
                    <br />
                    <br />
                    {eachText}
                </li>
            )
        }))
    }

    renderSummary() {
        let eleCount = []

        return (
            this.state.summary.split('\n').map((ele, i) => {

                //---------- eleCount.push STORES each item into eleCount ----------//
                if (ele.slice(0, 17) === "Scripture Reading" || ele.slice(0, 5) === "Text:") {
                    eleCount.push("")
                } else {
                    eleCount.push(ele.trim())
                }

                if (eleCount[i - 1] !== ele.trim()) {
                    if (ele.slice(0, 17) !== "Scripture Reading") {
                        if (ele.slice(0, 5) !== "Text:") {
                    
                            return <li key={'summary' + i}>
                                <p>{ele}<br /></p>
                                </li>
                        }
                    }
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
        const currentState = this.state.bookmark;
        !currentState ? this.setCurrentPage() : this.removeCurrentPage();
        this.setState({ bookmark: !currentState })
    }

    render() {
        if (this.isMainBodyDevoNull() && !this.getCurrentPage()) return <div></div>

        console.log('render')

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