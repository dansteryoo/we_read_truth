import { 
    RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE, RECEIVE_NOTE_ERRORS
} from '../actions/note_actions';

const notesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_NOTES:
            delete newState.noteId
            return Object.assign({}, newState, action.notes);

        case RECEIVE_NOTE:
            return Object.assign({}, { noteId: action.note });

        case REMOVE_NOTE:
            delete newState[action.noteId]
            return Object.assign({}, newState);

        case RECEIVE_NOTE_ERRORS:
            return Object.assign({}, { noteErrors: action.errors });

        default:
            return newState;
    }
};

export default notesReducer;