import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './HomeMenuBar.jsx';
import SignUpTabs from './SignUpTabs.jsx'
import LoginPage from './form/LoginForm.jsx';
import styles from '../../public/css/login_signup.css';

const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <SignUpTabs/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
