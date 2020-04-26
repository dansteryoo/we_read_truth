import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevos } from '../../actions/devo_actions'
import CategoriesPage from './categories';

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
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);