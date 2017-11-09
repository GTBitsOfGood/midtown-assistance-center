import { combineReducers } from 'redux'
import user from './reducers/user'

const root = combineReducers({
  user,
  student_view: (state = {}) => state,
  tutor_view: (state = {}) => state,
  admin_view: (state = {}) => state
});

export default root;