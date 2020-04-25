import { RECEIVE_DEVOS, RECEIVE_DEVO, CLEAR_DEVO_STATE, RECEIVE_DEVO_BOOK } from '../actions/devo_actions';

const devosReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_DEVOS:
            return Object.assign({}, newState, action.devos)

        case RECEIVE_DEVO:
            return Object.assign({}, newState, { [action.devo.id]: action.devo });

        case RECEIVE_DEVO_BOOK:
            return Object.assign({}, newState, { [action.devo.book]: action.devoBook });

        case CLEAR_DEVO_STATE:
            return {};

        default:
            return oldState;
    }
};

export default devosReducer;