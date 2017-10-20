import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './main.jsx';
import store from '../redux/store.js';

ReactDOM.render(
	<Provider store={store}>
		<Main/>
		<Profile/>
</Provider>, document.getElementById('root'));