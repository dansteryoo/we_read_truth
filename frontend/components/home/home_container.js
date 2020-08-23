import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { clearDevoState } from '../../actions/devo_actions'
import { clearErrors } from '../../actions/session_actions';
import { clearNoteState } from '../../actions/note_actions';
import HomePage from './home';

const mapStateToProps = (state) => {
    
    let devoBook = Object.values(state.devos);

    if (devoBook.length > 0) {
      
      if (
        devoBook[0].gender === "HE" ||
        (devoBook[0].gender === "SHE" && devoBook[0].book === "Judges")
      ) {
        devoBook.reverse();
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
    clearErrors: () => dispatch(clearErrors()),
    clearDevoState: () => dispatch(clearDevoState()),
    clearNoteState: () => dispatch(clearNoteState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);