import React from 'react';
import SideNavItem from './sidenav_item'
import { allBookTitles, allBookTitlesFormat } from '../function_helpers/bookTitles'

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: '',
            navSet: false,
        }

        this.handleGetDevo = this.handleGetDevo.bind(this);
        this.myRef = React.createRef();
        this.renderDevoBookTitle = this.renderDevoBookTitle.bind(this);
        this.checkUserBookmark = this.checkUserBookmark.bind(this);
        this.setPayload = this.setPayload.bind(this);
    }

    checkUserBookmark() {
        const { bookmark } = this.props.currentUser
        return bookmark !== undefined && bookmark !== null
    }

    setPayload(data) {
        let payload;
        if (!data) return 

        if (data.book.includes("&")) {
            payload = {
                gender: data.gender,
                book: data.book.replace("&", "%26")
            }
        } else {
            payload = {
                gender: data.gender,
                book: data.book
            }
        }

        return payload
    }

    componentDidMount() {
        const { currentUser } = this.props

        if (this.checkUserBookmark()) {
            let userPayload = this.setPayload(currentUser.bookmark)

            return this.props.fetchDevoBook(userPayload)
                .then(() => this.setState({ book: currentUser.bookmark.book }))
        }
    }

    componentWillUnmount() {
        // this.props.clearDevoState()
    };

    componentDidUpdate(prevProps) {
        const { currentUser, devoBook, bookmark } = this.props;

        if (devoBook !== prevProps.devoBook) {
            if (devoBook.length > 0) {
                this.setState({ book: devoBook[0].book })
                if (devoBook[0].book !== this.state.book) return this.myRef.current.scrollTo(0, 0)

            } else if (Object.values(bookmark).length > 0 && bookmark.user_id === currentUser.id) {
                currentUser.bookmark
                    ? this.props.fetchDevoBook(this.setPayload(bookmark))
                    : this.props.fetchDevoBook(this.setPayload(currentUser.bookmark))

                !this.state.navSet
                    ? this.props.fetchDevoBook(this.setPayload(bookmark))
                        .then(() => this.setState({ navSet: true }))
                    : false 
            }
        } 
    }

    handleGetDevo(devoId) {
        this.props.fetchDevo(devoId)
    }

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