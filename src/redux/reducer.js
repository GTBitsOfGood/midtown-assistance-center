import { combineReducers } from 'redux';
import user from './reducers/user';
import studentView from './reducers/student_view';
import tutorView from './reducers/tutor_view';
import adminView from './reducers/admin_view';
import subjects from './reducers/subject';

const root = combineReducers({
  user,
  studentView,
  tutorView,
  adminView,
  subjects
});

export default root;