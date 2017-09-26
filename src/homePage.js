import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './homeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.js';
import Loginpage from './login.js';

const HomeComp = function() {
  return (
    <div>
      <Loginpage/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));