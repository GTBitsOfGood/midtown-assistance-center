import * as types from '../actions/types/subject_types';

let initial_state = {
    fetching: false,
    fetched: false,
    error: null,
    availableSubjects: []
};

export default function change_subject(state = initial_state, action) {
    switch (action.type) {
        case types.getSubjectsPending:
            return { ...state, fetching: true };

        case types.getSubjectsRejected:
            return { ...state, fetching: false, error: action.payload };

        case types.getSubjectsFulfilled:
            return {
                ...state,
                fetching: false,
                fetched: true,
                availableSubjects: action.payload.data.map(
                    subject => subject._id
                )
            };

        case types.addSubjectPending:
            return { ...state, fetching: true };

        case types.addSubjectRejected:
            return { ...state, fetching: false, error: action.payload };

        case types.addSubjectFulfilled:
            return {
                ...state,
                fetching: false,
                fetched: true
            };
    }
    return state;
}
