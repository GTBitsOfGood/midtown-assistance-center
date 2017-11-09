import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import root from './reducer';

let initialState = {
  user: {},
  student_view: {
    // TODO tutoring session state
    online_tutors: []
  },
  tutor_view: {
    // TODO tutoring session state
  },
  admin_view: {
    // TODO stats
    new_tutors: []
  }
};

let store = createStore(
  root,
  initialState,
  applyMiddleware(logger)
);

export default store;