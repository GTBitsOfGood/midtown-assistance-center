import * as types from './types/school_types';
import axios from 'axios';

export function getAllSchoolCodes() {
    return {
        type: types.getAllSchools,
        payload: axios.get('/api/schools')
    };

}
export function addSchool() {
    return {
        type: types.addSchool,
        payload: axios.post('/api/schools')
    };
}

