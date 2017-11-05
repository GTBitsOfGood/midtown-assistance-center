import { combineReducers } from 'redux';

export default function userReducer(state, action) {
    console.warn(action + ' called on user reducer');
    let new_state = Object.assign({}, state);

    switch (action.type) {

      case 'UPDATE_IN_USER':
          let new_user = action.payload;
          new_state.user = new_user;
          break;


    }

    return new_state;
}