import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevo, fetchDevos, fetchDevoBook } from '../../actions/devo_actions'
import { clearErrors } from '../../actions/session_actions';
import HomePage from './home';

const mapStateToProps = (state) => {
    // debugger
    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devos: Object.values(state.devos)  
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    fetchDevos: (devoBook) => dispatch(fetchDevos(devoBook)),
    fetchDevo: (devoId) => dispatch(fetchDevo(devoId)),
    clearErrors: () => dispatch(clearErrors())
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);