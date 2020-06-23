import { connect } from 'react-redux';
import { closeModal, openModal } from '../../../actions/modal_actions';
import { fetchDevo, fetchDevoBook } from '../../../actions/devo_actions';
import { createBookmark, fetchBookmark } from '../../../util/bookmark_api_util';
import SideNav from './sidenav';

const mapStateToProps = (state) => {
    
    let devoBook;
    if (state.devos.devoBook === undefined) {
        devoBook = []
    } else {
        devoBook = Object.values(state.devos.devoBook)
        if (devoBook[0].gender === "HE" ||
            devoBook[0].gender === "SHE" && devoBook[0].book === "Judges") {
            devoBook.reverse()
        }
    }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devoBook: devoBook,
        bookmark: state.bookmark 
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    fetchDevo: (devoId) => dispatch(fetchDevo(devoId)),
    fetchDevoBook: (book) => dispatch(fetchDevoBook(book)),
    createBookmark: (bookmark) => dispatch(createBookmark(bookmark)),
    fetchBookmark: () => dispatch(fetchBookmark())
});


export default connect(mapStateToProps, mapDispatchToProps)(SideNav);