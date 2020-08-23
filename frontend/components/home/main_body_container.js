import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevo } from '../../actions/devo_actions';
import { clearErrors } from '../../actions/session_actions';
import { createBookmark, fetchBookmark, deleteBookmark } from '../../actions/bookmark_actions';
import MainBody from './main_body';

const mapStateToProps = (state) => {

    let devoBook = Object.values(state.devos);

    if (devoBook.length > 0) {
      let obj = devoBook[0];

      if (
        obj.gender === "HE" ||
        (obj.gender === "SHE" && obj.book === "Judges")
      ) {
        devoBook.reverse();
      }
    }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        mainBodyDevo: state.devos.mainBodyDevo || null,
        devoBook: devoBook,
        bookmark: state.bookmark 
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    clearErrors: () => dispatch(clearErrors()),
    fetchDevo: (devoId) => dispatch(fetchDevo(devoId)),
    createBookmark: (bookmark) => dispatch(createBookmark(bookmark)),
    fetchBookmark: () => dispatch(fetchBookmark()),
    deleteBookmark: (bookmarkId) => dispatch(deleteBookmark(bookmarkId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);