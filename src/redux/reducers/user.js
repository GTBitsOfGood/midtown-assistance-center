import config from 'config';
import * as types from '../actions/types/user_types'

let initial_state = {};

export default function change_user(state = initial_state, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case types.updateUser:
      let new_user = action.payload;
      new_state = new_user;

      // Hide password (even though our backend should already hide it)
      new_state.password = config.hidden_password;
      break;
  }

  return new_state;
}