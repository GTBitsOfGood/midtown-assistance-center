import { combineReducers } from 'redux';

export default function userReducer(state, action) {
    console.log('user reducer called with', action);
    let new_state = Object.assign({}, state);

    switch (action.type) {

      case 'UPDATE_IN_USER':
          let new_user = action.payload;
          new_state.user = new_user;

          // Hide password
          new_state.user.password = '**hidden**';

          break;


    }

    return new_state;
}