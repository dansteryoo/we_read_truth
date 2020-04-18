import { RECEIVE_DEVOS, RECEIVE_DEVO, CLEAR_DEVO_STATE } from '../actions/devo_actions';

const devosReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_DEVOS:
            return action.devos;

        case RECEIVE_DEVO:
            newState[action.devo.id] = action.devo
            return newState;

        case CLEAR_DEVO_STATE:
            return {};

        default:
            return oldState;
    }
};

export default devosReducer;
