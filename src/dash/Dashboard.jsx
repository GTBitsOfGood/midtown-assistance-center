import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import StudentProfile from './StudentProfile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../home/AboutUs.jsx';
import {Router, Route, browserHistory} from 'react-router';
import TutorProfile from './TutorProfile.jsx';

const DashComp = function() {
  return (
    <div className="animated fadeInDown">
      <HomeMenuBar homeordash='dash'/>
      <Router history={browserHistory}>
          <Route path="/dash" component={DefaultDash}/>
          <Route path="/dash/about" component={AboutUs}/>
          <Route path="/dash/profile" component={StudentProfile}/>
          <Route path="/dash/tutorprofile" component={TutorProfile}/>
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
