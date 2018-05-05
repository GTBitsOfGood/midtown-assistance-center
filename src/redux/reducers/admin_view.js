import * as types from '../actions/types/admin_types';

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    errorType: null,
    unapprovedTutors: []
};

export default function change_admin(state = initialState, action) {
    switch (action.type) {
        case types.getUnapprovedTutorsPending:
            return { ...state, fetching: true, error: null };
        case types.getUnapprovedTutorsRejected:
            return {
                ...state,
                fetching: false,
                error: action.payload,
                errorType: types.getUnapprovedTutorsRejected
            };
        case types.getUnapprovedTutorsFulfilled:
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                unapprovedTutors: action.payload.data.tutors
            };
        case types.addNewAdminPending:
            return { ...state, fetching: true, error: null };
        case types.addNewAdminRejected:
            return {
                ...state,
                fetching: false,
                error: action.payload.response.data.error_message,
                errorType: types.addNewAdminRejected
            };
        case types.addNewAdminFulfilled:
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null
            };
        default:
            return state;
    }
}
