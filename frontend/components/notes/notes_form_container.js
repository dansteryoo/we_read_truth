import { connect } from 'react-redux';
import { fetchNote, fetchNotes, deleteNote, updateNote, createNote } from '../../actions/note_actions'
import { openModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import NotesForm from './notes_form';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {

    let noteId;
    let notes;
    let noteErrors; 
    
    if (state.notes.noteId !== undefined) {
        noteId = state.notes.noteId;
        notes = [];
    } else {
        noteId = {};
        notes = Object.values(state.notes);
    } 

    if (state.notes.noteErrors !== undefined) {
        noteErrors = state.notes.noteErrors;
    } else {
        noteErrors = [];
    } 

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devos: Object.values(state.devos),
        notes: notes,
        noteId: noteId,
        noteErrors: noteErrors
    }
};

const mapDispatchToProps = (dispatch) => ({
    openModal: (formType, id) => dispatch(openModal(formType, id)),
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNote: (noteId) => dispatch(fetchNote(noteId)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: (note) => dispatch(createNote(note)),
    clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesForm));