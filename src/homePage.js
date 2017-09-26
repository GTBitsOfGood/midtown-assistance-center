import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './homeMenuBar';
import StudentSignUpForm from './StudentSignUpForm.js';

const HomeComp = function() {
  return (
    <div>
      <HomeMenuBar />
      <StudentSignUpForm/>
    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));