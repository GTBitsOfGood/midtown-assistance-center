import * as types from '../actions/types/admin_types';

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    errorType: null,
    schoolsAndAccessCodes: [],
    unapprovedTutors: [],
    allTutors: [],
    bans: [],
    bannedStudents: [],
    bannedTutors: []
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

    case types.getAllTutorsPending:
        return { ...state, fetching: true, error: null };
    case types.getAllTutorsRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
            errorType: types.getAllTutorsRejected
        };
    case types.getAllTutorsFulfilled:
        return {
            ...state,
            fetching: false,
            fetched: true,
            error: null,
            allTutors: action.payload.data.tutors
        };
    case types.getAllSchoolsAndAccessCodesFulfilled:
        return {
            ...state,
            fetching: false,
            fetched: true,
            error: null,
            schoolsAndAccessCodes: action.payload.data.filteredCodes
        };

    case types.getAllSchoolsAndAccessCodesPending:
        return {
            ...state,
            fetching: true,
            error: null
        };

    case types.getAllSchoolsAndAccessCodesRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
            errorType: types.getAllSchoolsAndAccessCodesRejected
        };
    case types.addNewAccessCodeFulfilled:
        return {
            ...state,
            fetching: false,
            fetched: true,
            error: null
        };
    case types.addNewAccessCodePending:
        return {
            ...state,
            fetching: true,
            error: null
        };

    case types.addNewAccessCodeRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
            errorType: types.addNewAccessCodeRejected,
        };

    case types.getAllBansPending:
        return { ...state, fetching: true, error: null };
    case types.getAllBansRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
            errorType: types.getAllTutorsRejected
        };
    case types.getAllBansFulfilled:
        return {
            ...state,
            fetching: false,
            fetched: true,
            error: null,
            bans: action.payload.data.bans
        };

    case types.getBannedUsersPending:
        return { ...state, fetching: true, error: null };
    case types.getBannedUsersRejected:
        return {
            ...state,
            fetching: false,
            error: action.payload,
            errorType: types.getBannedUsersRejected
        };
    case types.getBannedUsersFulfilled:
        return {
            ...state,
            fetching: false,
            fetched: true,
            error: null,
            bannedStudents: action.payload.data.students,
            bannedTutors: action.payload.data.tutors
        };

    default:
        return state;
    }
}
