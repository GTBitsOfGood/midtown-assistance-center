import * as types from '../actions/types/school_types';

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    errorType: null,
    allSchoolCodes: []
};

export default function getAllSchoolCodes(state = initialState, action) {
    switch (action.type) {
    case types.getAllSchoolsPending:
        return { ...state, fetching: true, error: null };
    case types.getAllSchoolsFulfilled:
        return {
            ...state, fetching: false,
            fetched: true,
            error: null,
            accessCodes: action.payload.data.map(
                school => school.school_code
            )
        };
    case types.getAllSchoolsRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };

    default:
        return state;
    }
}