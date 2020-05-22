import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevo, fetchDevoBook, clearDevoState } from '../../actions/devo_actions'
import { clearErrors } from '../../actions/session_actions';
import HomePage from './home';

const mapStateToProps = (state) => {

    let heDevos, sheDevos;
    if (state.devos.count === undefined) {
        heDevos = {};
        sheDevos = {};
    } else {
        heDevos = Object.values(state.devos.devos).filter(ele => ele.gender === "HE");
        sheDevos = Object.values(state.devos.devos).filter(ele => ele.gender === "SHE");
    }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        heDevos: heDevos,
        sheDevos: sheDevos,
        mainBodyDevo: state.devos.mainBodyDevo || null
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    fetchDevoBook: (devoBook) => dispatch(fetchDevoBook(devoBook)),
    fetchDevo: (devoId) => dispatch(fetchDevo(devoId)),
    clearErrors: () => dispatch(clearErrors()),
    clearDevoState: () => dispatch(clearDevoState())
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);