import * as types from '../actions/types/admin_types';

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    unapprovedTutors: []
};

export default function change_admin(state = initialState, action) {
    switch (action.type) {
        case types.getUnapprovedTutorsPending:
            return { ...state, fetching: true };
        case types.getUnapprovedTutorsRejected:
            return { ...state, fetching: false, error: action.payload };
        case types.getUnapprovedTutorsFulfilled:
            return {
                ...state,
                fetching: false,
                fetched: true,
                unapprovedTutors: action.payload.data.tutors
            };
        default:
            return state;
    }
}
