import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StudentSignUpForm from './form/StudentSignUpForm';
import TutorSignUpForm from './form/TutorSignUpForm';

const SignUpTabs = () => (
    <div className="bkgrd">
        <div className="animated fadeInLeft text-center signup-form">
            <h3 className="signup-header">Sign Up</h3>
            <Tabs
                className="signup-tabs"
                defaultActiveKey={1}
                id="uncontrolled-tab-example"
            >
                <Tab eventKey={1} title="Student" className="signup-tab">
                    <StudentSignUpForm />
                </Tab>
                <Tab eventKey={2} title="Tutor" className="signup-tab">
                    <TutorSignUpForm />
                </Tab>
            </Tabs>
        </div>
    </div>
);

export default SignUpTabs;
