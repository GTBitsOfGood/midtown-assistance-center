import config from 'config';
import * as types from '../actions/types/user_types'
import axios from 'axios';

let initial_state = {
    fetched: false,
    fetching: false,
    stat: {
        statistics: {
            avgRating: 0,
            totalRatings: 0
        }
    },
    sessions: [],
    online: false,
};

export default function change_user(state = initial_state, action) {
    let new_state = Object.assign({}, state);

    switch (action.type) {
        case types.fetchUserPending:
            new_state = {...state, fetching: true};
            break;
        case types.fetchUserRejected:
            new_state = {...state, fetching: false, error: action.payload};
            break;
        case types.fetchUserFulfilled:
            new_state = {...state, fetching: false, fetched: true, ...action.payload.data};
            let type = '';
            if (new_state.grade_level !== undefined) {
                type = types.typeStudent;
            } else if (new_state.approved !== undefined) {
                type = types.typeTutor;
            }
            new_state = {...new_state, type: type};
            break;
        case types.setTutorOnlinePending:
            new_state = {...state};
            break;
        case types.setTutorOnlineRejected:
            new_state = {...state, error: action.payload};
            break;
        case types.setTutorOnlineFulfilled:
            new_state = {...state, ...action.payload.data.tutor};
            break;
        case types.logoutUserPending:
            new_state = {...state, fetching: true};
            break;
        case types.logoutUserRejected:
            new_state = {...state, fetching: false, error: action.payload};
            break;
        case types.logoutUserFulfilled:
            new_state = {...initial_state, logged_out: action.payload.data };
            break;
        // FIXME: use thunks and remove old stuff that's not used
        case types.fetchUserFromDb:
            new_state = action.payload;

            // FIXME Hide password (even though our backend should already hide it)
            // new_state.password = config.hidden_password;
            break;

        case types.saveStudentToDb:
            // FIXME should use thunks for this :/
            new_state = action.payload;

            // FIXME Hide password (even though our backend should already hide it)
            // new_state.password = config.hidden_password;

            // Make save call
            axios.patch('/api/student', new_state)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
            break;

        case types.saveTutorToDb:
            // FIXME should use thunks for this :/
            new_state = action.payload;

            // FIXME Hide password (even though our backend should already hide it)
            // new_state.password = config.hidden_password;

            // Make save call
            axios.patch('/api/tutor', new_state)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
            break;

        case types.saveAdminToDb:
            // FIXME should use thunks for this :/
            new_state = action.payload;

            // FIXME Hide password (even though our backend should already hide it)
            // new_state.password = config.hidden_password;

            // Make save call
            axios.patch('/api/admin', new_state)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
            break;
        case types.getRatingPending:
            new_state = {...state, fetching: true};
            break;
        case types.getRatingRejected:
            new_state = {...state, fetching: false, error: action.payload};
            break;
        case types.getRatingFulfilled:
            new_state = {...state, fetching: false, fetched: true, stat: action.payload.data};
            break;
        case types.getSessionsPending:
            new_state = {...state, fetching: true};
            break;
        case types.getSessionsRejected:
            new_state = {...state, fetching: false, error: action.payload};
            break;
        case types.getSessionsFulfilled:
            new_state = {...state, fetching: false, fetched: true, sessions: action.payload.data};
            break;
    }

    return new_state;
}