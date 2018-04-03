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
  }
};

export default function change_user(state = initial_state, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
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
      return {...state, fetching: true};
    case types.getRatingRejected:
      return {...state, fetching: false, error: action.payload};
    case types.getRatingFulfilled:
      return {...state, fetching: false, fetched: true, stat: action.payload.data};
    case types.getSessionsPending:
        return {...state, fetching: true};
    case types.getSessionsRejected:
        return {...state, fetching: false, error: action.payload};
    case types.getSessionsFulfilled:
        return {...state, fetching: false, fetched: true, sessions: action.payload.data};

  }

  return new_state;
}