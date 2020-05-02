import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevoIndex } from '../../actions/devo_actions'
import CategoriesPage from './categories';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {

    // let heDevoIdx, sheDevoIdx;
    // if (state.devos.count === undefined) {
    //     heDevoIdx = {};
    //     sheDevoIdx = {};
    // } else {

        let heDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "HE");
        let sheDevoIdx = Object.values(state.devos).filter(ele => ele.gender === "SHE");
    // }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devoBook: state.modal.book,
        heDevoIndex: heDevoIdx,
        sheDevoIndex: sheDevoIdx
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (modal, book) => dispatch(openModal(modal, book)),
    fetchDevoIndex: () => dispatch(fetchDevoIndex()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesPage));