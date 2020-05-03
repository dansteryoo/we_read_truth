import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchNote, fetchNotes, deleteNote, updateNote, createNote } from '../../actions/note_actions'
import NotesPage from './notespage';

const mapStateToProps = (state) => {
    debugger
    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devos: Object.values(state.devos)  
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType, id) => dispatch(openModal(formType, id)),
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNote: (noteId) => dispatch(fetchNote(noteId)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: (note) => dispatch(createNote(note))
});


export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);