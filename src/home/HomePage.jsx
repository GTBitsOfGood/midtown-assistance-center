import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeMenuBar from './HomeMenuBar';
import SignUpTabs from './SignUpTabs';
import LoginPage from './form/LoginForm';
import AboutUs from '../AboutUs';
import styles from '../../public/css/login_signup.css';
import ForgotPasswordForm from './form/ForgotPasswordForm';
import ResetPasswordForm from './form/ResetPasswordForm';

const HomeComp = () => (
    <div>
        <BrowserRouter>
            <div>
                <Route path="/home" component={HomeMenuBar} />
                <Switch>
                    <Route exact path="/home/about" component={AboutUs} />
                    <Route exact path="/home/login" component={LoginPage} />
                    <Route exact path="/home/signUp" component={SignUpTabs} />
                    <Route exact path="/home/forgotPassword" component={ForgotPasswordForm} />
                    <Route exact path="/home/resetPassword" component={ResetPasswordForm} />
                    <Route path="/home" component={AboutUs} />
                </Switch>
            </div>
        </BrowserRouter>
    </div>
);

ReactDOM.render(<HomeComp />, document.getElementById('root'));
