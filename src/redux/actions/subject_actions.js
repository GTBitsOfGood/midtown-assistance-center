import * as types from './types/subject_types';
import axios from 'axios';

export function getSubjects() {
    return {
        type: types.getSubjects,
        payload: axios.get('/api/subjects')
    };
}

export function addSubject(subject) {
    return {
        type: types.addSubject,
        payload: axios.post('/api/subjects', { _id: subject })
    };
}
