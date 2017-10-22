import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import HomeMenuBar from './HomeMenuBar.jsx';
import SignUpTabs from './SignUpTabs.jsx';
import LoginPage from './form/LoginForm.jsx';
import AboutUs from './AboutUs.jsx';
import styles from '../../public/css/login_signup.css';
import { Provider } from 'react-redux';
import store from '../redux/store.js';


const HomeComp = function() {
  return (
    <div>
      <Provider store={store}>
      <HomeMenuBar homeordash='home'/>
      </Provider>
      <Router history={browserHistory}>
        <Route path="/home" component={AboutUs}/>
        <Route path="/home/login" component={LoginPage}/>
        <Route path="/home/signUp" component={SignUpTabs}/>
      </Router>

    </div>
  );
};

ReactDOM.render(<HomeComp/>, document.getElementById('root'));
