import * as DevosAPIUtil from '../util/devos_api_util';

export const RECEIVE_DEVOS = 'RECEIVE_DEVOS';
export const RECEIVE_DEVO = 'RECEIVE_DEVO';
export const CLEAR_DEVO_STATE = "CLEAR_DEVO_STATE";


export const receiveDevos = (devos) => {
    return {
        type: RECEIVE_DEVOS,
        devos
    }
};

export const receiveDevo = (devo) => {
    return {
        type: RECEIVE_DEVO,
        devo
    }
};

export const clearDevoState = () => {
    return {
        type: CLEAR_DEVO_STATE
    }
};


export const fetchDevos = () => dispatch => {
    return DevosAPIUtil.fetchDevos()
        .then(devos => dispatch(receiveDevos(devos))
    )  
};

export const fetchDevo = (devoId) => dispatch => {
    return DevosAPIUtil.fetchDevo(devoId)
        .then(devo => dispatch(receiveDevo(devo))
    )
};


export const fetchSearchResult = (keywords, startDate, endDate) => dispatch => {
    return DevosAPIUtil.fetchSearchResult(keywords, startDate, endDate)
        .then(devos => dispatch(receiveListings(devos))
    )
};