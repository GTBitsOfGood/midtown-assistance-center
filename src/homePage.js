import React from 'react';
import ReactDOM from 'react-dom';
import SignupTutor from './signupTutor';
import HomeMenuBar from './homeMenuBar';
import LoginPage from './login.js';
import styles from '../public/css/login_signup.css';
import Signup from './signup';


const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <Signup/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
