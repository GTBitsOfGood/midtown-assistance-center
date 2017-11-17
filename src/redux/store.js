import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import root from './reducer';

let store = createStore(
  root,
  applyMiddleware(logger)
);

export default store;