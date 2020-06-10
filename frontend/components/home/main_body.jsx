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
            bookmark: false
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.myRef = React.createRef();
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.splitPassages = this.splitPassages.bind(this);
        this.isMainBodyDevoNull = this.isMainBodyDevoNull.bind(this);
        this.getCurrentPage = this.getCurrentPage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
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

    splitPassages() {
        return this.state.passages.split(', ')
    }

    isMainBodyDevoNull() {
        if (this.props.mainBodyDevo === null) return true 
        return false
    }

    getCurrentPage() {
        return JSON.parse(localStorage.getItem('currentPage'));
    }

    setCurrentPage() {
        return localStorage.setItem('currentPage', JSON.stringify(this.state));
    }

    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {

        if (this.getCurrentPage()) {
            this.setState(this.getCurrentPage())
            
        } else if (!this.isMainBodyDevoNull()) {
            const { id, img, passages, summary, title } = this.props.mainBodyDevo;

            if (this.getCurrentPage() && (this.getCurrentPage().id === id)) {
                this.setState({ bookmark: true });
            }

            this.splitPassages(passages).forEach(each => {
                return this.ESVpassageGetter(each.trim())
            })

            this.setState({
                id: id,
                title: title,
                passages: passages,
                summary: summary,
                img: img,
                mainBodyChanged: true,
            })
        }
    };

    componentDidUpdate(prevProps) {
        console.log('update')
        const { id, mainBodyChanged, bookmark } = this.state;
        if (this.isMainBodyDevoNull() || prevProps.mainBodyDevo === null) return 

        //---------- PREVENTS MULTIPLE this.setState on update ----------//
        if (mainBodyChanged) {
            this.setState({ mainBodyChanged: false });
        }

        if (!bookmark && mainBodyChanged) {
            if (this.getCurrentPage() && 
                (this.getCurrentPage().id === id || this.getCurrentPage().id === this.state.id)) {
                this.setState({ bookmark: true });
            }
        }

        if (this.props.mainBodyDevo.id !== prevProps.mainBodyDevo.id) {
            if (bookmark) this.setCurrentPage()

            const { id, img, passages, summary, title } = this.props.mainBodyDevo;

            //---------- SCROLL TO TOP on render ----------//
            this.myRef.current.scrollTo(0, 0);
            //---------- PREVENTS DUPS in esvPassage ----------//
            this.setState({ esvPassage: [] });

            this.splitPassages(passages).forEach(each => {
                return this.ESVpassageGetter(each.trim())
            });

            this.setState({
                id: id,
                title: title,
                passages: passages,
                summary: summary,
                img: img,
                mainBodyChanged: true,
                bookmark: false
            });
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
        return (
            this.props.devoBook.map((each, i) => {
                if (each.id === this.state.id) {
                    return i + 1
                }
            })
        )
    }

    toggleBookmark() {
        const currentState = this.state.bookmark;
        !currentState ? this.setCurrentPage() : localStorage.clear();
        this.setState({ bookmark: !currentState })
    }

    render() {

        console.log('render')
        return (
            <div className='middle-container'>
                <div className='devo-main-title'>
                    <span className='devo-main-day'>Day {this.renderDay()}:</span>
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