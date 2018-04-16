import * as types from './types/subject_types';
import axios from 'axios';

export function getSubjects() {
    return {
        type: types.getSubjects,
        payload: axios.get('/api/subjects')
    };
}
