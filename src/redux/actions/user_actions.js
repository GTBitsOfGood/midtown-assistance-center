import * as types from './types/user_types'
import axios from 'axios';
import { getSubjects } from "./subject_actions";

// export function fetchUser() {
//     return dispatch => {
//         dispatch({type: types.fetchUserPending});
//         return axios.get('/user').then(
//             res => {
//                 dispatch({type: types.fetchUserFulfilled, payload: res.data});
//             },
//             err => {
//                 dispatch({type: types.fetchUserRejected, payload: err});
//             }
//         );
//     };
// }

export function fetchUser() {
    return {
        type: types.fetchUser,
        payload: axios.get('/user')
    }
}

export function fetchUserAndInfo() {
    return (dispatch, getState) => {
        return dispatch(fetchUser()).then(() => {
            const user = getState().user;
            if (user.type === types.typeTutor) {
                return dispatch(getStat(user))
                    .then(dispatch(getSessions(user)))
                    .then(dispatch(getSubjects()))
            } else if (user.type === types.typeStudent) {

            }
        });
    }
}

// export const fetchUser = () => async dispatch => {
//   dispatch({ type: types.fetchUserPending });
//   const res = await axios.get('/user');
//   dispatch({ type: types.fetchUserFulfilled, payload: res.data });
// };

export function saveStudent(user) {
    return {
        type: types.saveStudentToDb,
        payload: user
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
        payload: axios.post('/api/getTutorStats', {username: user._id})
    }
}

export function getSessions(user) {
    return {
        type: types.getSessions,
        payload: axios.post('/api/getTutorSessions', {username: user._id})
    }
}


export function saveAdmin(user) {
    return {
        type: types.saveAdminToDb,
        payload: user
    };
}