import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeMenuBar from './HomeMenuBar.jsx';
import SignUpTabs from './SignUpTabs.jsx';
import LoginPage from './form/LoginForm.jsx';
import AboutUs from '../AboutUs.jsx';
import styles from '../../public/css/login_signup.css';

const HomeComp = function() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/home" component={HomeMenuBar} />
          <Switch>
            <Route exact path="/home/about" component={AboutUs} />
            <Route exact path="/home/login" component={LoginPage} />
            <Route exact path="/home/signUp" component={SignUpTabs} />
            <Route path="/home" component={AboutUs} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<HomeComp />, document.getElementById('root'));
