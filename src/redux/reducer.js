import { combineReducers } from 'redux'
import user from './reducers/user'
import student_view from './reducers/student_view'

const root = combineReducers({
  user,
  student_view,
  tutor_view: (state = {}) => state,
  admin_view: (state = {}) => state
});

export default root;