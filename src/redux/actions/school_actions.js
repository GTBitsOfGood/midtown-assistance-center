import * as types from './types/school_types';
import axios from 'axios';

export function getAllSchoolCodes() {
    return {
        type:types.getAllSchools,
        payload: axios.get('/api/schools')
    };
}