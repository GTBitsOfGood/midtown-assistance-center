import * as types from './types/accessCode_types';
import axios from 'axios';

export function getAllAccessCodes() {
    return {
        type:types.getAllAccessCodes,
        payload: axios.get('/api/accessCodes')
    };

}
