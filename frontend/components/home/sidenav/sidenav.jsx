import React from 'react';
import SideNavItem from './sidenav_item'
import { allBookTitles, allBookTitlesFormat } from './bookTitles'

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: '',
        }

        this.handleGetDevo = this.handleGetDevo.bind(this);
        this.myRef = React.createRef();
        this.renderDevoBookTitle = this.renderDevoBookTitle.bind(this);
    };

    componentDidMount() {
        // let stringifyCurrentUserId = JSON.stringify(this.props.currentUser.id)
        // const currentPage = JSON.parse(localStorage.getItem(stringifyCurrentUserId))
        // //---------- IF localStorage EXISTS then setState ----------//
        // if (currentPage) {
        //     this.setState({ book: currentPage.book })
        //     return this.props.fetchDevo(currentPage.id);
        // }
    };

    componentWillUnmount() {
    };

    componentDidUpdate(prevProps) {
        const { devoBook } = this.props;
        if (devoBook !== prevProps.devoBook) {
            if (devoBook.length > 0) {
                this.setState({ book: devoBook[0].book })

                //---------- SCROLL TO TOP on render ----------//
                if (devoBook[0].book !== this.state.book) {
                    this.myRef.current.scrollTo(0, 0);
                }
            }
        }
    };

    handleGetDevo(devoId) {
        this.props.fetchDevo(devoId);
    };

    renderDevoBookTitle () {
        const { book } = this.state;
        let isBookInBookTitles = allBookTitles.includes(book)
        let isBookTitleDefined = allBookTitlesFormat[book] !== undefined

        let devoBookTitle;
        if (isBookInBookTitles && !isBookTitleDefined) {
            devoBookTitle = allBookTitles[allBookTitles.indexOf(book)]

        } else if (isBookInBookTitles && isBookTitleDefined) {
            devoBookTitle = allBookTitlesFormat[book]
        }

        return devoBookTitle
    }
    

    render() {
        console.log(this.state);
        console.log(this.props);
        
        console.log('sidenav RENDER')

       

        return (
            <div className='left-container'>
                <div className='sidenav-title'>
                    <span>{this.renderDevoBookTitle()}</span>
                </div>
                <div className='sidenav-container' ref={this.myRef}>
                    <ul className="sidenav-ul" >
                        {
                            this.props.devoBook.map((dailyDevo, i) => (
                                <SideNavItem
                                    days={i}
                                    dailyDevo={dailyDevo}
                                    handleGetDevo={this.handleGetDevo}
                                    key={dailyDevo.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideNav;