import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevoIndex, clearDevoState, fetchDevoBook } from '../../actions/devo_actions'
import CategoriesPage from './categories';

const mapStateToProps = (state) => {

    let deleteMainBodyDevo;
    
    if (state.devos.mainBodyDevo) {
        deleteMainBodyDevo = Object.values(state.devos).filter(ele => {
            return ele.id === undefined
        })
    } else {
        deleteMainBodyDevo = Object.values(state.devos)
    }
    
    let allDevosIdxFiltered = deleteMainBodyDevo.filter(ele => {
        return ele.gender === "HE" || ele.gender === "SHE"
    });

    let allDevosIdx = allDevosIdxFiltered.map(each => ({ 
        gender: each.gender, 
        book: each.book.toLowerCase() 
    }));

    let heDevoIdx;
    let sheDevoIdx;

    if (state.modal.data === undefined) {
        heDevoIdx = allDevosIdx.filter(ele => ele.gender === "HE");
        sheDevoIdx = allDevosIdx.filter(ele => ele.gender === "SHE");
    } else {
        heDevoIdx = allDevosIdx.filter(ele => (
            ele.gender === "HE" && ele.book.match(state.modal.data) 
        ));
        sheDevoIdx = allDevosIdx.filter(ele => (
            ele.gender === "SHE" && ele.book.match(state.modal.data)
        ));
    };

    let devoBook;
    if (state.devos.devoBook === undefined) {
        devoBook = []
    } else {
        devoBook = Object.values(state.devos.devoBook)
    };

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        heDevoIndex: heDevoIdx,
        sheDevoIndex: sheDevoIdx,
        devoBook: devoBook
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