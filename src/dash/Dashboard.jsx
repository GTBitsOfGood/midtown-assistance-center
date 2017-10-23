import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import DefaultProfile from './Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

const DashComp = function() {
  return (
    <div>
      <HomeMenuBar homeordash='dash'/>
      {/*<DefaultDash/>*/}
      <DefaultProfile/>
    </div>
  );
};


ReactDOM.render(
    <Provider store={store}>
    <DashComp></DashComp>
    </Provider>,
    document.getElementById('root')
);
