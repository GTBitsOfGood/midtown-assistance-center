import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import userReducer from './reducer.js';

let store = createStore(userReducer, {
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
});

store.subscribe(() => {
    console.log('store changed: ', store.getState());
});

export default store;