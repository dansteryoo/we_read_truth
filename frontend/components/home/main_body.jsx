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
        }

        this.ESVpassageGetter = this.ESVpassageGetter.bind(this);
        this.myRef = React.createRef();
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

    //---------- REACT LIFE CYCLES ----------//

    componentDidMount() {
        const { id, img, passages, summary, title } = this.props.mainBodyDevo;

        passages.split(', ').forEach(each => {
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
    };

    componentWillUnmount() {
        this.setState({ 
            id: null, 
            mainBodyChanged: false, 
            esvPassage: [] 
        })
    };

    componentDidUpdate(prevProps) {
        //---------- SCROLL TO TOP on render ----------//
        this.myRef.current.scrollTo(0, 0);

        //---------- PREVENTS MULTIPLE this.setState on update ----------//
        if (this.state.mainBodyChanged) {
            this.setState({ mainBodyChanged: false })
        }

        if (this.props.mainBodyDevo.id !== prevProps.mainBodyDevo.id) {

            //---------- PREVENTS DUPS in esvPassage ----------//
            this.setState({ esvPassage: [] })

            const { id, img, passages, summary, title } = this.props.mainBodyDevo;

            passages.split(', ').forEach(each => {
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

    //---------- RENDER FUNCTIONS ----------//

    renderPassages() {

        const { passages, esvPassage } = this.state; 

        if (passages.length !== 0) {
            if (esvPassage.length === passages.split(', ').length) {

                function newPassageData (propsPassage, esvText) {
                    let newHash = [];

                    propsPassage.forEach(ele => {
                        esvText.forEach(each => {
                            if (each.passage === ele.trim()) {
                                newHash.push({
                                    passage: ele.trim(),
                                    text: each.text
                                })
                            }
                        })
                    })

                    return newHash
                };

                let newEsvData = newPassageData(passages.split(', '), esvPassage);

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
                    })
                )
            }
        }
    }

    renderSummary() {
        return (
            this.state.summary.split('\n').map((item, i) => {
                if (item.trim() !== '') {
                    if (item.slice(0, 17) !== "Scripture Reading") {
                        if (item.slice(0, 5) !== "Text:") {
                            //---------- REPLACE "BY" with "By" in SHE DEVOS ----------//
                            return <p key={'summary' + i}><br />{item.replace(/BY/, 'By')}</p>
                        }
                    }
                }
            })
        )
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div className='middle-container'>
                <div className='devo-main-title'>
                    <span>{this.state.title}</span>
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