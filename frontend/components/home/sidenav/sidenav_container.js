import { connect } from 'react-redux';
import { closeModal, openModal } from '../../../actions/modal_actions';
import { fetchDevo } from '../../../actions/devo_actions';

import SideNav from './sidenav';

const mapStateToProps = (state) => {
    
    let devoBook;
    if (state.devos.devoBook === undefined) {
        devoBook = []
    } else {
        devoBook = Object.values(state.devos.devoBook).filter(ele => {
            return ele.title !== "Weekly Truth" && ele.title !== "Grace Day"
        })
    };
    
    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devoBook: devoBook
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    fetchDevo: (devoId) => dispatch(fetchDevo(devoId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SideNav);