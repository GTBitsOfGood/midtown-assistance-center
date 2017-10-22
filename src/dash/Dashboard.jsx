import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../HomeMenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

const DashComp = function() {
  return (
    <div>
      <HomeMenuBar homeordash='dash'/>
      <DefaultDash/>
    </div>
  );
};


ReactDOM.render(
    <Provider store={store}>
    <DashComp></DashComp>
    </Provider>,
    document.getElementById('root')
);

