import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import Navbar from './navbar';

const mapStateToProps = (state) => {

    let heDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "HE");
    let sheDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "SHE");

    return {
        // devoBook: state.modal.book,
        currentUser: state.users[state.session.id],
        errors: state.errors,
        heDevoIndex: heDevoIdx,
        sheDevoIndex: sheDevoIdx
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal, book) => dispatch(openModal(modal, book)),
    fetchDevoIndex: () => dispatch(fetchDevoIndex()),
    clearDevoState: () => dispatch(clearDevoState()),
    fetchDevoBook: (book) => dispatch(fetchDevoBook(book))

});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);