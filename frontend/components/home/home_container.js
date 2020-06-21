import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { clearDevoState } from '../../actions/devo_actions'
import { clearErrors } from '../../actions/session_actions';
import HomePage from './home';

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
    clearErrors: () => dispatch(clearErrors()),
    clearDevoState: () => dispatch(clearDevoState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);