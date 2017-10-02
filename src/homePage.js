import React from 'react';
import ReactDOM from 'react-dom';
import SignupTutor from './SignupTutor';
import HomeMenuBar from './homeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.js';
import LoginPage from './login.js';
import styles from '../public/css/login_signup.css';
import { Switch, Router, Route, IndexRoute, browserHistory } from 'react-router';


const HomeComp = function() {
  return (
    <div>
        <HomeMenuBar/>
        <Router history={ browserHistory }>
            <Route exact path='home/login' component={LoginPage}/>
            <Route path='home/studentSignUp' component={StudentSignUpForm}/>
            <Route path='home/tutorSignUp' component={SignupTutor}/>
        </Router>
    </div>
  );
};


ReactDOM.render(
    <HomeComp></HomeComp>,
    document.getElementById('root')
);

