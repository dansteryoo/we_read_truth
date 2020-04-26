import { connect } from 'react-redux';
import { fetchNotes, fetchNote, deleteNote, updateNote, createNote } from '../../actions/note_actions';
import { openModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import NotesForm from './notes_form';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        currentUser: state.users[state.session.id],
        notes: Object.values(state.notes),
        errors: state.errors
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