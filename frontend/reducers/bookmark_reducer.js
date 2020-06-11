import { RECEIVE_BOOKMARK, REMOVE_BOOKMARK } from '../actions/bookmark_actions';

const bookmarkReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_BOOKMARK:
            return Object.assign({}, { bookmarkId: action.bookmark });

        case REMOVE_BOOKMARK:
            delete newState[action.bookmarkId]
            return []

        default:
            return newState;
    }
};

export default bookmarkReducer;