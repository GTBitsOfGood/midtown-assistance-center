import axios from 'axios';
import * as types from './types/student_view_types';

export function getTutors(search_type, search_subject, search_time) {
    return {
        type: types.getOnlineTutors,
        payload: axios.get('/api/onlineTutors', {params: {subject: search_subject, availability: search_time}})
    };
}

export function updateSearch(search_type, search_subject, search_time) {
    return {
        type: types.updateOnlineTutors,
        payload: {
            searchType: search_type,
            searchSubject: search_subject,
            searchTime: search_time 
        }
    };
}

export function getOnlineTutors(search_type, search_subject, search_time) {
    return (dispatch) => 
        dispatch(getTutors(search_type, search_subject, search_time))
            .then(() => dispatch(updateSearch(search_type, search_subject, search_time)));
}

export function updateOnlineTutors(search_type, search_subject, search_time) {
    return (dispatch) =>
        dispatch(getTutors(search_type, search_subject, search_time));
}
