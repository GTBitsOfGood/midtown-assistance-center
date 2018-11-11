import * as types from './types/admin_types';
import axios from 'axios';

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

export const getBans = () => ({
    type: types.getAllBans,
    payload: axios.get('/api/allPendingBans')
});

export const banUser = (ban_id, banned) => ({
    type: types.banUser,
    payload: axios.post('/api/banUser', {ban_id, banned})
});

export function banUserAndUpdate(ban_id, banned) {
    return (dispatch, getState) => {
        return dispatch(banUser(ban_id, banned)).then(() => {
            return dispatch(getBans());
        });
    };
}
