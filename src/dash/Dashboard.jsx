import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import StudentDash from './student_view/StudentDash.jsx';
import StudentProfile from './student_view/Profile.jsx';
import TutorDash from './tutor_view/TutorDash.jsx';
import TutorProfile from './tutor_view/Profile.jsx';
import AdminDash from './admin_view/AdminDash.jsx';
import AdminProfile from './admin_view/Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../home/AboutUs.jsx';
import {Router, Route, browserHistory} from 'react-router';
import { updateUser } from '../redux/actions/user_actions.js';
import { connect } from 'react-redux';
import axios from 'axios';

const studentRoutes = (
  <Route path="/dash">
    <Route path="/" component={StudentDash}/>
    <Route path="/about" component={AboutUs}/>
    <Route path="/profile" component={StudentProfile}/>
  </Route>
);

const tutorRoutes = (
  <Route path="/dash">
    <Route path="/" component={TutorDash}/>
    <Route path="/about" component={AboutUs}/>
    <Route path="/profile" component={TutorProfile}/>
  </Route>
);

const adminRoutes = (
  <Route path="/dash">
    <Route path="/" component={AdminDash}/>
    <Route path="/about" component={AboutUs}/>
    <Route path="/profile" component={AdminProfile}/>
  </Route>
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
    if (this.props.user === undefined) {
      return (
        <h1>
          Loading!
        </h1>
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
        <HomeMenuBar homeordash='dash'/>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Since we never use the redux state here
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch(updateUser(user))
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
