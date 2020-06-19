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
        this.userBookmarkBlank = this.userBookmarkBlank.bind(this);
        this.setPayload = this.setPayload.bind(this);
    }

    userBookmarkBlank() {
        const { bookmark } = this.props.currentUser
        return bookmark == (undefined || null)
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
        let userId = JSON.stringify(this.props.currentUser.id)
        const currentPage = JSON.parse(localStorage.getItem(userId))

        if (currentPage) {
            return this.props.fetchDevoBook(this.setPayload(currentPage))

        } else if (!this.userBookmarkBlank()) {
            const { bookmark } = this.props.currentUser
            let userPayload = this.setPayload(bookmark)

            return this.props.fetchDevoBook(userPayload)
                .then(() => this.setState({ book: bookmark.book }))
        }
    }

    componentDidUpdate(prevProps) {
        const { currentUser, devoBook, bookmark } = this.props
        let propsBookmarkBlank = Object.values(bookmark).length < 1

        if (devoBook !== prevProps.devoBook) {
            if (devoBook.length > 0) {
                this.setState({ book: devoBook[0].book })

                devoBook[0].book !== this.state.book
                    ? this.myRef.current.scrollTo(0, 0)
                    : false

            } else if (!propsBookmarkBlank && bookmark.user_id === currentUser.id) {
                this.props.fetchDevoBook(this.setPayload(bookmark))

            } else if (!this.userBookmarkBlank()) {
                this.props.fetchDevoBook(this.setPayload(currentUser.bookmark))
            }

            !this.state.navSet
                ? this.setState({ navSet: true })
                : false
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