import { applyMiddleware, createStore } from 'redux';

// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from './reducer';

const store = createStore(
    root,
    composeWithDevTools(applyMiddleware(promise(), thunk))
);

export default store;
