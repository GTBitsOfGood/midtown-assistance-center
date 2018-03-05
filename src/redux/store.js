import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import root from './reducer';
import promise from 'redux-promise-middleware';

let store = createStore(
  root,
  applyMiddleware(promise(), thunk, logger)
);

export default store;