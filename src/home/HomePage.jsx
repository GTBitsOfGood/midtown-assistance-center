import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './menu/HomeMenuBar.jsx';
import StudentSignUpForm from './form/StudentSignUpForm.jsx';
import TutorSignUpForm from './form/TutorSignUpForm.jsx';
import LoginPage from './form/LoginForm.jsx';
import styles from '../../public/css/login_signup.css';

const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <StudentSignUpForm/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
