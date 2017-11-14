import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './student_view/StudentDash.jsx';
import DefaultAdminDash from './admin_view/AdminDash.jsx';
import DefaultProfile from './student_view/Profile.jsx';
import TutorDash from './tutor_view/TutorDash.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../home/AboutUs.jsx';
import {Router, Route, browserHistory} from 'react-router';
import { updateUser } from '../redux/actions/user_actions.js';
import { connect } from 'react-redux';
import axios from 'axios';

export class DashComp extends React.Component {

  componentDidMount() {
    let self = this;
    axios.get('/user')
      .then(function (response) {
        if (response.data !== '') {
          console.log('Dashboard received user info from passport');
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
    return (
      <div className="animated fadeInDown">
        <HomeMenuBar homeordash='dash'/>
          <Router history={browserHistory}>
          <Route path="/dash" component={DefaultDash}/>
          <Route path="/dash/about" component={AboutUs}/>
          <Route path="/dash/profile" component={DefaultProfile}/>
          <Route path="/dash/admin" component={DefaultAdminDash}/>
          <Route path="/dash/tutor" component={TutorDash}/>
          </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Since we never use the redux state here
  return {};
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
