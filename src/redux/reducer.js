import { combineReducers } from 'redux';
import user from './reducers/user';
import studentView from './reducers/student_view';
import tutorView from './reducers/tutor_view';
import adminView from './reducers/admin_view';
import subjects from './reducers/subject';
import accessCodes from './reducers/accessCode';
import schools from './reducers/school';

const root = combineReducers({
    user,
    studentView,
    tutorView,
    adminView,
    subjects,
    accessCodes,
    schools

});

export default root;
