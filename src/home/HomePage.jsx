import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import HomeMenuBar from './HomeMenuBar.jsx';
import SignUpTabs from './SignUpTabs.jsx';
import LoginPage from './form/LoginForm.jsx';
import AboutUs from '../AboutUs.jsx';
import styles from '../../public/css/login_signup.css';

const HomeComp = function() {
    return (
        <div>
            <HomeMenuBar/>
            <Router history={browserHistory}>
                <Route path="/home" component={AboutUs}/>
                <Route path="/home/about" component={AboutUs}/>
                <Route path="/home/login" component={LoginPage}/>
                <Route path="/home/signUp" component={SignUpTabs}/>
            </Router>
        </div>
    );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));