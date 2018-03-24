import React from 'react';
import ReactDOM from 'react-dom';

import DashMenuBar from './DashMenuBar.jsx';
import StudentDash from './student_view/StudentDash.jsx';
import StudentProfile from './student_view/Profile.jsx';
import TutorDash from './tutor_view/TutorDash.jsx';
import TutorProfile from './tutor_view/Profile.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import AboutUs from '../AboutUs.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { fetchUser, saveTutor } from '../redux/actions/user_actions.js';
import { connect } from 'react-redux';
import axios from 'axios';
import {GridLoader} from 'halogen';
import styles from '../../public/css/index.css';
import socketIOClient from 'socket.io-client';

const SOCKETIO_ENDPOINT = 'http://localhost:3000'
const socket = socketIOClient(SOCKETIO_ENDPOINT);

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

const loading = (
    <div className="animated fadeInDown">
        <BrowserRouter>
            <div>
                <Route path="/dash" component={DashMenuBar}/>
                <div className={styles.loading}>
                    <GridLoader  color="#EEB211" size="150px"/>
                </div>
            </div>
        </BrowserRouter>
    </div>
);

class DashComp extends React.Component {

    componentDidMount() {
        let self = this;
        axios.get('/user')
            .then(function (response) {
                if (response.data !== '') {
                    self.props.storeUser(response.data);
                } else {
                    console.error('Dashboard received no user info');
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    componentWillUnmount() {
        socket.close();
    }

    render() {

        if (this.props.user._id === undefined) {
            return loading;
        }

        if (this.props.user.logging_out) {
            console.log('LOGGING OUT');
            axios.get('/logout', {params:{username:this.props.user._id}}).then(function(response) {
                console.log(response.data);
                if (response.data) {
                    document.location.href='/';
                }
            }).catch(function(error) {
                console.log(error);
            });
            return loading;
        }

        // FIXME we should introduce a user type variable
        let routes;
        if (this.props.user.grade_level !== undefined) {
            console.log('Student logged in');
            routes = studentRoutes;
        } else if (this.props.user.approved !== undefined) {
            console.log('Tutor logged in');
            routes = tutorRoutes;
            socket.emit('tutor-login');

            if (!this.props.user.online && !this.props.user.logging_out) {
                let new_tutor = Object.assign({}, this.props.user);
                new_tutor.online = true;
                this.props.setTutorOnline(new_tutor);


                return loading;
            }
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
        storeUser: (user) => dispatch(fetchUser(user)),
        setTutorOnline: (tutor) => dispatch(saveTutor(tutor))
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
