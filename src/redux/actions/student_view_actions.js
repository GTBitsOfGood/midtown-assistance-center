import * as types from './types/student_view_types';

export function changeTutorsAction(tutors) {
    return {
        type: types.updateOnlineTutors,
        payload: {
            filteredTutors: tutors
        }
    };
}

export function onSearchAction(search_type, search_subject, search_time) {
    return {
        type: types.onSearchClicked,
        payload: {
            searchType: search_type,
            searchSubject: search_subject,
            searchTime: search_time
        }
    };
}
