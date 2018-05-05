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
    type: types.approveTutor,
    payload: axios.patch('/api/tutor', new_tutor)
  }
}

export function approveTutor(tutor, status) {
  return (dispatch, getState) => {
    return dispatch(updateTutor(tutor, status))
      .then(() => {
        return dispatch(getUnapprovedTutors());
    });
  }
}