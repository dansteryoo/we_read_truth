import React from 'react';
import SideNavItem from '../sidenav/sidenav_item'
import { allBookTitles, allBookTitlesFormat } from '../function_helpers/bookTitles'
import { setPayload } from '../function_helpers/helper_funcs'

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
    }

    userBookmarkBlank() {
        const { bookmark } = this.props.currentUser
        return bookmark == (undefined || null)
    }

    componentDidMount() {
        let userId = JSON.stringify(this.props.currentUser.id)
        const currentPage = JSON.parse(localStorage.getItem(userId))

        if (currentPage) {
            return this.props.fetchDevoBook(setPayload(currentPage))

        } else if (!this.userBookmarkBlank()) {
            const { bookmark } = this.props.currentUser
            let userPayload = setPayload(bookmark)

            return this.props.fetchDevoBook(userPayload)
                .then(() => this.setState({ book: bookmark.book }))
        }
    }

    componentDidUpdate(prevProps) {
        const { currentUser, devoBook, bookmark } = this.props
        const propsBookmarkBlank = Object.values(bookmark).length < 1

        if (devoBook !== prevProps.devoBook) {
            if (devoBook.length > 0) {
                this.setState({ book: devoBook[0].book })

                devoBook[0].book !== this.state.book 
                    && this.myRef.current.scrollTo(0, 0)

            } else if (!propsBookmarkBlank && bookmark.user_id === currentUser.id) {
                this.props.fetchDevoBook(setPayload(bookmark))

            } else if (!this.userBookmarkBlank()) {
                this.props.fetchDevoBook(setPayload(currentUser.bookmark))
            }

            !this.state.navSet 
                && this.setState({ navSet: true })
        }
    }

    handleGetDevo(devoId) {
        this.props.fetchDevo(devoId)
    }

    renderDevoBookTitle () {
        const { book } = this.state;
        let devoBookTitle = allBookTitlesFormat[book];
        let devoBookTitleRender = allBookTitles[allBookTitles.indexOf(book)];

        return devoBookTitleRender || devoBookTitle;
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