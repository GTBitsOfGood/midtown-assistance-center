import * as types from '../actions/types/accessCode_types';

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    errorType: null,
    allAccessCodes: []
};

export default function getAllAccessCodes(state = initialState, action) {
    switch (action.type) {
    case types.getAllAccessCodesPending:
        return { ...state, fetching: true, error: null };
    case types.getAllAccessCodesFulfilled:
        return {
            ...state, fetching: false,
            fetched: true,
            error: null,
            accessCodes: action.payload.data.map(
                accessCode => accessCode.school_code
            )
        };
    case types.getAllAccessCodesRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };

    default:
        return state;
    }
}