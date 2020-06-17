import { RECEIVE_BOOKMARK, REMOVE_BOOKMARK } from '../actions/bookmark_actions';

const bookmarkReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_BOOKMARK: 
            if (action.bookmark.bookmark[0] === undefined) return oldState
            debugger
            return Object.assign({}, newState, action.bookmark.bookmark[0]);

        case REMOVE_BOOKMARK:
            debugger
            delete newState[action.bookmark.bookmark[0]]
            return Object.assign({}, newState, action.bookmark.bookmark[0]);

        default:
            return oldState;
    }
};

export default bookmarkReducer;