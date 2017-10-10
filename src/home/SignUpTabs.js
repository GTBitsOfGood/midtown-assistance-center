import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StudentSignUpForm from './form/StudentSignUpForm';
import SignupTutor from './form/TutorSignUpForm';

const Signup = () => {
  return (
    <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center signup-form container">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Student">
          <StudentSignUpForm/>
        </Tab>
        <Tab eventKey={2} title="Tutor">
          <SignupTutor/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Signup;