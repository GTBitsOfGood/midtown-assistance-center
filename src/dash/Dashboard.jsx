import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import DefaultProfile from './Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

import {Router, Route, browserHistory} from 'react-router';

const DashComp = function() {
  return (
    <div>
      <Provider store={store}>
        <HomeMenuBar homeordash='dash'/>
      </Provider>
      {/*<DefaultDash/>*/}
        <Router history={browserHistory}>
            <Route path="/dash" component={DefaultDash}/>
            <Route path="/dash/profile" component={DefaultProfile}/>
        </Router>
    </div>
  );
};


ReactDOM.render(
    <Provider store={store}>
    <DashComp></DashComp>
    </Provider>,
    document.getElementById('root')
);
