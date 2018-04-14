import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StudentSignUpForm from './form/StudentSignUpForm.jsx';
import TutorSignUpForm from './form/TutorSignUpForm.jsx';

const SignUpTabs = () => {
  return (
    <div className="">
      <div className="bkgrd" />
      <div className="animated fadeInLeft col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center signup-form container">
        <h3 className="signup-header">Sign Up</h3>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Student">
            <StudentSignUpForm />
          </Tab>
          <Tab eventKey={2} title="Tutor">
            <TutorSignUpForm />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SignUpTabs;
