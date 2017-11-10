import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import root from './reducer';

let initialState = {
  user: {},
  studentView: {
    // TODO tutoring session state
    filteredTutors: [],
    searchType: 'online',
    searchSubject: undefined,
    searchTime: undefined
  },
  tutorView: {
    // TODO tutoring session state
  },
  adminView: {
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