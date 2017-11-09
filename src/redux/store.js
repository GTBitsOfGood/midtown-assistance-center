import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import userReducer from './reducer.js';

let store = createStore(userReducer, {
    user: {}
});

store.subscribe(() => {
    console.log('store changed: ', store.getState());
});

export default store;