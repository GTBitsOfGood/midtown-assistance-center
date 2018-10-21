import axios from 'axios';
import * as types from './types/tutor_types';

export function submitTutorReport(user_id, rating_id, explanation) {
    return {
        type: types.submitTutorReport,
        payload: axios.post('/api/submitTutorReport', {user_id, rating_id, explanation})
    };
}

export function foo() {

}