import * as types from './types/user_types';
import axios from 'axios';
import { getSubjects } from './subject_actions';

export function fetchUser() {
  return {
    type: types.fetchUser,
    payload: axios.get('/user')
  };
}

export function fetchUserAndInfo() {
  return (dispatch, getState) => {
    return dispatch(fetchUser()).then(() => {
      const user = getState().user;
      if (user.type === types.typeTutor) {
        return dispatch(setTutorOnline(user, { online: true }))
          .then(dispatch(getStat(user)))
          .then(dispatch(getSessions(user)))
          .then(dispatch(getSubjects()));
      } else if (user.type === types.typeStudent) {
      } else if (user.type === types.typeAdmin) {
      }
    });
  };
}

export function setTutorOnline(user, status) {
  return dispatch => {
    return dispatch({
      type: types.setTutorOnline,
      status: { ...status },
      payload: axios.patch('/api/tutor', { ...user, ...status })
    }).then(() => {
      if (status.logging_out) {
        dispatch(logoutUser(user));
      }
    });
  };
}

export function logoutUser(user) {
  return {
    type: types.logoutUser,
    payload: axios.get('/logout', { params: { username: user._id } })
  };
}

export function saveStudent(student) {
  return {
    type: types.saveStudent,
    payload: axios.patch('/api/student', student)
  };
}

export function saveTutor(user) {
  return {
    type: types.saveTutorToDb,
    payload: user
  };
}

export function getStat(user) {
  return {
    type: types.getRating,
    payload: axios.post('/api/getTutorStats', { username: user._id })
  };
}

export function getSessions(user) {
  return {
    type: types.getSessions,
    payload: axios.post('/api/getTutorSessions', { username: user._id })
  };
}

export function saveAdmin(user) {
  return {
    type: types.saveAdminToDb,
    payload: user
  };
}
