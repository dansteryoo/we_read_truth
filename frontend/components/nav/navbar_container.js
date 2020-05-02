import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import Navbar from './navbar';

const mapStateToProps = (state) => {
    return {
        // devoBook: state.modal.book,
        currentUser: state.users[state.session.id],
        errors: state.errors
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal, book) => dispatch(openModal(modal, book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);