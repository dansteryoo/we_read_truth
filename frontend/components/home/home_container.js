import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import HomePage from './home';

const mapStateToProps = (state) => {
    return {
        formType: 'Update',
        errors: state.errors,
        devos: Object.values(state.devos),
        notes: Object.values(state.notes)  
    }
};


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (formType) => dispatch(openModal(formType)),
    fetchDevos: () => dispatch(fetchDevos()),
    fetchDevo: (devoId) => dispatch(fetchDevos(devoId)),
    fetchNotes: (noteId) => dispatch(fetchNotes(noteId)),
    createNote: (note) => dispatch(createNote(note)),
    updateNote: (noteId) => dispatch(updateNote(noteId)),
    deleteNote: (noteId) => dispatch(createNote(noteId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);