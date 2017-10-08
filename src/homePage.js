import React from 'react';
import ReactDOM from 'react-dom';
import SignupTutor from './signupTutor';
import HomeMenuBar from './homeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.js';
import LoginPage from './login.js';
import styles from '../public/css/login_signup.css';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';


const HomeComp = function() {
  return (
    <div>
    <HomeMenuBar/>
    <Router history={browserHistory}>
          <Route path="/home/login" component={LoginPage}/>
          <Route path="/home/signUp" component={SignupTutor}/>
    </Router>
    </div>
  );
};


ReactDOM.render(
    <HomeComp></HomeComp>,
    document.getElementById('root')
);

