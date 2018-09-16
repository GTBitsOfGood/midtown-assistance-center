import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StudentSignUpForm from './form/StudentSignUpForm';
import TutorSignUpForm from './form/TutorSignUpForm';

const SignUpTabs = () => (
    <div className="">
        <div className="bkgrd" />
        <div className="animated fadeInLeft">
            <div className="signup-form-bkgrd col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" />
            <div className="animated fadeInLeft col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center signup-form container">
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
    </div>
);

export default SignUpTabs;
