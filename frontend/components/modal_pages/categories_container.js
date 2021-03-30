import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchDevoIndex, clearDevoState, fetchDevoBook } from '../../actions/devo_actions'
import CategoriesPage from './categories';

const mapStateToProps = ({ devos, modal, users, session, errors }) => {
    const deleteMainBodyDevo = devos.mainBodyDevo
        ? Object.values(devos).filter((ele) => ele.id === undefined)
        : Object.values(devos);
    
    const allDevosIdxFiltered = deleteMainBodyDevo.filter(
        (ele) => ele.gender === "HE" || ele.gender === "SHE"
    );

    const allDevosIdx = allDevosIdxFiltered.map((each) => ({
        gender: each.gender,
        book: each.book.toLowerCase(),
    }));

    const heDevoIndex = modal.data
        ? allDevosIdx.filter(
              (ele) => ele.gender === "HE" && ele.book.match(modal.data)
          )
        : allDevosIdx.filter((ele) => ele.gender === "HE");

    const sheDevoIndex = modal.data
        ? allDevosIdx.filter(
              (ele) => ele.gender === "SHE" && ele.book.match(modal.data)
          )
        : allDevosIdx.filter((ele) => ele.gender === "SHE");

    const devoBook = devos.devoBook ? Object.values(devos.devoBook) : []

    return {
        currentUser: users[session.id],
        errors,
        heDevoIndex,
        sheDevoIndex,
        devoBook,
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (modal, book) => dispatch(openModal(modal, book)),
    fetchDevoIndex: () => dispatch(fetchDevoIndex()),
    clearDevoState: () => dispatch(clearDevoState()),
    fetchDevoBook: (book) => dispatch(fetchDevoBook(book))
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);