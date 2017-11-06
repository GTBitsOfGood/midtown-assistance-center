import { combineReducers } from 'redux';
import config from 'config'

export default function userReducer(state, action) {
    console.log('user reducer called with', action);
    let new_state = Object.assign({}, state);

    switch (action.type) {

      case 'UPDATE_IN_USER':
          let new_user = action.payload;
          new_state.user = new_user;

          // Hide password (even though our backend should already hide it)
          new_state.user.password = config.hidden_password;

          break;
    }

    return new_state;
}