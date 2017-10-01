import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './HomeMenuBar.jsx';
import StudentSignUpForm from './StudentSignUpForm.jsx';
import TutorSignUpForm from './TutorSignUpForm.jsx';
import LoginPage from './LoginForm.jsx';
import styles from '../public/css/login_signup.css';

const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <StudentSignUpForm/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
