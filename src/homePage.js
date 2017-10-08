import React from 'react';
import ReactDOM from 'react-dom';
import SignupTutor from './signupTutor';
import HomeMenuBar from './homeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.js';
import LoginPage from './login.js';
import styles from '../public/css/login_signup.css';


const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <SignupTutor/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
