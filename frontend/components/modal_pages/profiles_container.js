import { connect } from 'react-redux';
import { updateUser, deleteUser, clearErrors } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import ProfilesPage from './profiles';

const mapStateToProps = (state) => {

    let errors;
    if (state.errors !== undefined) {
        errors = state.errors;
    } else {
        errors = [];
    }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        formType: 'Profile Update',
    }
};

const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(updateUser(user)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);