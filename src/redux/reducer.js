import { combineReducers } from 'redux'
import user from './reducers/user'
import studentView from './reducers/student_view'

const root = combineReducers({
  user,
  studentView,
  tutorView: (state = {}) => state,
  adminView: (state = {}) => state
});

export default root;