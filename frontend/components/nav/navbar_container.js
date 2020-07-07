import { connect } from 'react-redux';
import { logout, clearErrors } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import { clearDevoState } from '../../actions/devo_actions';
import Navbar from './navbar';

const mapStateToProps = (state) => {

    let heDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "HE");
    let sheDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "SHE");

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        heDevoIdx: heDevoIdx,
        sheDevoIdx: sheDevoIdx
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal, book) => dispatch(openModal(modal, book)),
    clearDevoState: () => dispatch(clearDevoState()),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);