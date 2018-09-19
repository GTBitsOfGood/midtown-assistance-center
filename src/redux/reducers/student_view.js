import * as types from '../actions/types/student_view_types';

const initialState = {
    // TODO tutoring session state
    filteredTutors: [],
    searchType: 'online',
    searchSubject: undefined,
    searchTime: undefined
};

export default function change_tutors(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
    case types.getOnlineTutors + types.FULFILLED:
        newState = { ...newState, filteredTutors: action.payload.data };
        return newState;

    case types.updateOnlineTutors:
        newState = { ...newState, filteredTutors: action.payload.filteredTutors };
        return newState;

    default:
        break;
    }

    return newState;
}
