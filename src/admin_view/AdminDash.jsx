import React from 'react';
import ApproveTutors from './ApproveTutors.jsx';
import TutorStatistics from './TutorStatistics.jsx';
import Navigation from './navigation/Navigation.jsx';
import Members from './Members.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from '../../public/css/admin.css';

class DefaultAdminDash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <Navigation></Navigation>
      <div className={styles.body_wrapper}>
      </div>
    </div>
    );
  }
}

export default DefaultAdminDash;

ReactDOM.render(
    <Provider store={store}>
        <DefaultAdminDash/>
    </Provider>,
    document.getElementById('root')
);