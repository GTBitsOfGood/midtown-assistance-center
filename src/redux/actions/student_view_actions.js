import axios from 'axios';
import * as types from './types/student_view_types';

export function getOnlineTutors(search_type, search_subject, search_time) {
    return {
        type: types.getOnlineTutors,
        payload: axios.get('/api/onlineTutors', {params: {subject: search_subject, availability: search_time}})
    } ;
}

export function foo() {

}