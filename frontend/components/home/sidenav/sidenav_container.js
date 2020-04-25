import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import SideNav from './sidenav';

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
    fetchDevos: () => dispatch(fetchDevos()),
    fetchDevo: (devoId) => dispatch(fetchDevos(devoId)),
    fetchDevoTitle: (devoTitle) => dispatch(fetchDevos(devoTitle)),
    fetchNotes: (noteId) => dispatch(fetchNotes(noteId)),
    createNote: (note) => dispatch(createNote(note)),
    updateNote: (noteId) => dispatch(updateNote(noteId)),
    deleteNote: (noteId) => dispatch(createNote(noteId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SideNav);