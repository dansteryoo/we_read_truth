import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevoIndex, clearDevoState, fetchDevoBook } from '../../actions/devo_actions'
import CategoriesPage from './categories';

const mapStateToProps = (state) => {
    // debugger

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
    clearDevoState: () => dispatch(clearDevoState()),
    fetchDevoBook: (book) => dispatch(fetchDevoBook(book))
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);