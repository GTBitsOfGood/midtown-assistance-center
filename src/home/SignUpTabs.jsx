import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StudentSignUpForm from './form/StudentSignUpForm.jsx';
import TutorSignUpForm from './form/TutorSignUpForm.jsx';

const SignUpTabs = () => {
  return (
    <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center signup-form container">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Student">
          <StudentSignUpForm/>
        </Tab>
        <Tab eventKey={2} title="Tutor">
          <TutorSignUpForm/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SignUpTabs;