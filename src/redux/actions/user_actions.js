import * as types from './types/user_types'
import axios from 'axios';

export function fetchUser (user) {
  return {
      type: types.fetchUserFromDb,
      payload: user
  };
}

export function saveStudent (user) {
  return {
    type: types.saveStudentToDb,
    payload: user
  };
}

export function saveTutor (user) {
  return {
    type: types.saveTutorToDb,
    payload: user
  };
}

export function getStat(user) {
  return {
    type: types.getRating,
    payload: axios.post('/api/getTutorStats', { username: user._id })
  }
}



export function saveAdmin (user) {
  return {
    type: types.saveAdminToDb,
    payload: user
  };
}