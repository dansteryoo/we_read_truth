import * as NotesAPIUtil from '../util/notes_api_util';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';


export const receiveReviews = (reviews) => {
    return {
        type: RECEIVE_REVIEWS,
        reviews
    }
};

export const receiveReview = (review) => {
    return {
        type: RECEIVE_REVIEW,
        review
    }
};

export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
};


export const fetchNotes = () => dispatch => {
    return NotesAPIUtil.fetchNotes()
        .then(notes => dispatch(receiveNotes(notes))
    )
};

export const fetchNote = (noteId) => dispatch => {
    return NotesAPIUtil.fetchNote(noteId)
        .then(note => dispatch(receiveNote(note))
    )
};

export const createNote = (note) => dispatch => {
    return NotesAPIUtil.createNote(note)
        .then(note => dispatch(receiveNote(note))
    )
};

export const updateNote = (note) => dispatch => {
    return NotesAPIUtil.updateNote(note)
        .then(note => dispatch(receiveNote(note))
    )
};

export const deleteNote = (noteId) => dispatch => {
    return NotesAPIUtil.deleteNote(noteId)
        .then(() => dispatch(removeNote(noteId))
    )
};