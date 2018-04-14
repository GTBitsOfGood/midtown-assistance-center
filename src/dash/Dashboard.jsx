import React from 'react';
import ReactDOM from 'react-dom';

import * as types from '../redux/actions/types/user_types';
import DashMenuBar from './DashMenuBar.jsx';
import StudentDash from './student_view/StudentDash.jsx';
import StudentProfile from './student_view/Profile.jsx';
import TutorDash from './tutor_view/TutorDash.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../AboutUs.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchUser, saveTutor } from '../redux/actions/user_actions.js';
import { connect } from 'react-redux';
import axios from 'axios';
import { GridLoader } from 'halogen';
import styles from '../../public/css/index.css';
import socketIOClient from 'socket.io-client';
import { fetchUserAndInfo } from '../redux/actions/user_actions';
import Approve from './admin_view/pages/Approve.jsx';
import AddAdmin from './admin_view/pages/AddAdmin.jsx';
import Dashboard from './admin_view/pages/Dashboard.jsx';

// TODO: use global const
const SOCKETIO_ENDPOINT =
  window.location.hostname +
  (window.location.port ? ':' + window.location.port : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

const studentRoutes = (
  <div>
    <Route exact path="/dash" component={StudentDash} />
    <Route exact path="/dash/about" component={AboutUs} />
    <Route exact path="/dash/profile" component={StudentProfile} />
  </div>
);

const tutorRoutes = (
  <div>
    <Route exact path="/dash" component={TutorDash} />
    <Route exact path="/dash/about" component={AboutUs} />
  </div>
);

const adminRoutes = (
  <div>
    <Route exact path="/dash" component={Dashboard} />
    <Route exact path="/dash/approve" component={Approve} />
    <Route exact path="/dash/add_admin" component={AddAdmin} />
  </div>
);

const loading = (
  <div className="animated fadeInDown">
    <BrowserRouter>
      <div>
        <Route path="/dash" component={DashMenuBar} />
        <div className={styles.loading}>
          <GridLoader color="#EEB211" size="150px" />
        </div>
      </div>
    </BrowserRouter>
  </div>
);

class DashComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserAndInfo();
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    if (this.props.user.fetching || !this.props.user.fetched) {
      return loading;
    }
    if (this.props.user.logging_out) {
      console.log('LOGGING OUT');
      axios
        .get('/logout', { params: { username: this.props.user._id } })
        .then(function(response) {
          console.log(response.data);
          if (response.data) {
            document.location.href = '/';
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      return loading;
    }
    let routes;
    if (this.props.user.type === types.typeStudent) {
      console.log('Student logged in');
      routes = studentRoutes;
    } else if (this.props.user.type === types.typeTutor) {
      console.log('Tutor logged in');
      routes = tutorRoutes;
      socket.emit('tutor-login');
    } else if (this.props.user.type === types.typeAdmin) {
      console.log('Admin logged in');
      routes = adminRoutes;
    }
    return (
      <div className="animated fadeInDown">
        <BrowserRouter>
          <div>
            <Route path="/dash" component={DashMenuBar} />
            <Switch>{routes}</Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserAndInfo: () => dispatch(fetchUserAndInfo())
  };
};

const DashComponent = connect(mapStateToProps, mapDispatchToProps)(DashComp);

ReactDOM.render(
  <Provider store={store}>
    <DashComponent />
  </Provider>,
  document.getElementById('root')
);
