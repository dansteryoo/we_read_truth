import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import LogInForm from './login_form';

const mapStateToProps = (state) => {
    
    let errors;
    if (state.errors !== undefined) {
        errors = state.errors;
    } else {
        errors = [];
    }

    return {
        formType: 'Log In',
        errors: errors
    }
};


const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)), 
    clearErrors: () => dispatch(clearErrors()),
});


export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);

