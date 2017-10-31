import { combineReducers } from 'redux';
import {actions} from './userActions.js';

export default function userReducer(state, action) {
    switch (action.type) {
    case actions[0]:
        return Object.assign({}, state, {user: {username: action.payload._id, password: action.payload.password}});
    default:
        return state;
    }
}