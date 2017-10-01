import React from 'react';
import ReactDOM from 'react-dom';
import SignupTutor from './TutorSignUpForm';
import HomeMenuBar from './HomeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.jsx';
import LoginPage from './LoginForm.jsx';
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
