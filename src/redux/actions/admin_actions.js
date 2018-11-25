import * as types from './types/admin_types';
import axios from 'axios';
import { deepStrictEqual } from 'assert';

export function getUnapprovedTutors() {
    return {
        type: types.getUnapprovedTutors,
        payload: axios.get('/api/unapprovedTutors')
    };
}

export function updateTutor(tutor, status) {
    let new_tutor = tutor;
    new_tutor.approved = true;
    new_tutor.status = status;
    return {
        // TODO: add reducer stuff
        type: types.approveTutor,
        payload: axios.patch('/api/tutor', new_tutor)
    };
}

export function approveTutor(tutor, status) {
    return (dispatch, getState) => {
        return dispatch(updateTutor(tutor, status)).then(() => {
            return dispatch(getUnapprovedTutors());
        });
    };
}

export function addAdmin(newAdmin) {
    return {
        type: types.addNewAdmin,
        payload: axios.post('/api/newAdmin', { newAdmin })
    };
}

export function getAllTutors() {
    return {
        type: types.getAllTutors,
        payload: axios.get('/api/allTutors')
    };
}

export function getAllSchoolsAndAccessCodes() {
    return {
        type: types.getAllSchoolsAndAccessCodes,
        payload: axios.get('/api/schoolsAndAccessCodes')
    };
}
export function addAccessCode(school_code, name) {
    return {
        type: types.addNewAccessCode,
        payload: axios.post('/api/accessCodes', {
            school_code,
            name,
        }),
    };
}

export function addAccessCodeAndUpdate(school_code, name) {
    return (dispatch) => {
        return dispatch(addAccessCode(school_code, name)).then(() => {
            return dispatch(getAllSchoolsAndAccessCodes());
        });
    };
};

export const addSchool = (school) => ({
    type: types.addSchool,
    payload: axios.post('/api/schools', school)
});

export function addSchoolAndUpdate(school) {
    return (dispatch) => {
        return dispatch(addSchool(school)).then(() => {
            return dispatch(getAllSchoolsAndAccessCodes());
        });
    };
}
