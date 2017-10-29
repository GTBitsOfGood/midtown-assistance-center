import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import DefaultProfile from './Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../home/AboutUs.jsx';
import {Router, Route, browserHistory} from 'react-router';

const DashComp = function() {
  return (
    <div>
      <HomeMenuBar homeordash='dash'/>
      <Router history={browserHistory}>
          <Route path="/dash" component={DefaultDash}/>
          <Route path="/dash/about" component={AboutUs}/>
          <Route path="/dash/profile" component={DefaultProfile}/>
      </Router>
    </div>
  );
};


ReactDOM.render(
    <Provider store={store}>
    <DashComp></DashComp>
    </Provider>,
    document.getElementById('root')
);
