import React from 'react';
import ReactDOM from 'react-dom';
import DashMenuBar from './DashMenuBar.jsx';
import StudentDash from './student_view/StudentDash.jsx';
import StudentProfile from './student_view/Profile.jsx';
import TutorDash from './tutor_view/TutorDash.jsx';
import TutorProfile from './tutor_view/Profile.jsx';
import AdminDash from './admin_view/AdminDash.jsx';
import AdminProfile from './admin_view/Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../AboutUs.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { fetchUser } from '../redux/actions/user_actions.js';
import { connect } from 'react-redux';
import axios from 'axios';
import {GridLoader} from 'halogen';
import styles from '../../public/css/index.css';

const studentRoutes = (
  <div>
    <Route exact path="/dash" component={StudentDash}/>
    <Route exact path="/dash/about" component={AboutUs}/>
    <Route exact path="/dash/profile" component={StudentProfile}/>
  </div>
);

const tutorRoutes = (
  <div>
    <Route exact path="/dash" component={TutorDash}/>
    <Route exact path="/dash/about" component={AboutUs}/>
    <Route exact path="/dash/profile" component={TutorProfile}/>
  </div>
);

const adminRoutes = (
  <div>
    <Route exact path="/dash/" component={AdminDash}/>
    <Route exact path="/dash/about" component={AboutUs}/>
    <Route exact path="/dash/profile" component={AdminProfile}/>
  </div>
);

class DashComp extends React.Component {

  componentDidMount() {
    let self = this;
    axios.get('/user')
      .then(function (response) {
        if (response.data !== '') {
          self.props.setUser(response.data);
        } else {
          console.error('Dashboard received no user info');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    if (this.props.user._id === undefined) {
      return (
        <GridLoader className={styles.loading} color="#EEB211" size="150px"/>
      )
    }

    // FIXME we should introduce a user type variable
    let routes;
    if (this.props.user.grade_level !== undefined) {
      routes = studentRoutes;
      console.log('Student logged in');
    } else if (this.props.user.approved !== undefined) {
      routes = tutorRoutes;
      console.log('Tutor logged in');
    } else {
      routes = adminRoutes;
      console.log('Admin logged in');
    }

    return (
      <div className="animated fadeInDown">
        <BrowserRouter>
          <div>
            <Route path="/dash" component={DashMenuBar}/>
            <Switch>
              {routes}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch(fetchUser(user))
  };
};

const DashComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashComp);

ReactDOM.render(
    <Provider store={store}>
        <DashComponent/>
    </Provider>,
    document.getElementById('root')
);
