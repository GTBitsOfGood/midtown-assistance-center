import { combineReducers } from 'redux';

export default function userReducer(state, action) {
    switch (action.type) {
      case 'UPDATE_IN_USER':
          let new_state = {
            user: {
              username: action.payload._id,
              password: action.payload.password
            }
          };
          return Object.assign({}, state, new_state);
      default:
          return state;
    }
}