import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { clearDevoState } from '../../actions/devo_actions'
import { clearErrors } from '../../actions/session_actions';
import MainBody from './main_body';

const mapStateToProps = (state) => {
    
    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        mainBodyDevo: state.devos.mainBodyDevo || null
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    clearErrors: () => dispatch(clearErrors()),
    clearDevoState: () => dispatch(clearDevoState())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);