import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import socketIOClient from 'socket.io-client';

import * as types from '../redux/actions/types/user_types';
import DashMenuBar from './DashMenuBar';
import StudentDash from './student_view/StudentDash';
import StudentProfile from './student_view/Profile';
import TutorDash from './tutor_view/TutorDash';
import store from '../redux/store';
import AboutUs from '../AboutUs';
import styles from '../../public/css/index.css';
import adminStyles from '../../public/css/admin.css';
import { fetchUserAndInfo } from '../redux/actions/user_actions';
import Approve from './admin_view/Approve';
import AddAdmin from './admin_view/AddAdmin';
import Dashboard from './admin_view/Dashboard';
import Schools from './admin_view/Schools';
import BanDash from './admin_view/BanDash';
import Navigation from './admin_view/navigation/Navigation';

// TODO: use global const
const SOCKETIO_ENDPOINT =
    window.location.hostname +
    (window.location.port ? `:${window.location.port}` : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

const studentRoutes = (
    <div>
        <Route exact path="/dash" component={StudentDash} />
        <Route exact path="/dash/about" component={AboutUs} />
        <Route exact path="/dash/profile" component={StudentProfile} />
    </div>
);

const adminRoutes = (
    <BrowserRouter>
        <div className={adminStyles.body}>
            <Route path="/dash" component={Navigation} />

            <div className={adminStyles.body_wrapper}>
                <Switch>
                    <Redirect exact from="/dash" to="/dash/dashboard" />
                    <Route exact path="/dash/dashboard" component={Dashboard} />
                    <Route exact path="/dash/approve" component={Approve} />
                    <Route exact path="/dash/schools" component={Schools} />
                    <Route exact path="/dash/ban" component={BanDash} />
                    <Route exact path="/dash/add_admin" component={AddAdmin} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
);

const tutorRoutes = (
    <div>
        <Route exact path="/dash" component={TutorDash} />
        <Route exact path="/dash/about" component={AboutUs} />
    </div>
);

const loading = (
    <div className="animated fadeInDown">
        <BrowserRouter>
            <div>
                <Route path="/dash" component={DashMenuBar} />
                <div className={styles.loading}>
                    <GridLoader color="#eeb211" size={150} />
                </div>
            </div>
        </BrowserRouter>
    </div>
);

class DashComp extends React.Component {
    componentDidMount() {
        const { fetchUserAndInfo } = this.props;
        fetchUserAndInfo();
    }

    componentWillUnmount() {
        socket.close();
    }

    render() {
        $(() => {
            $('[data-toggle="tooltip"]').tooltip();
        });

        const { user } = this.props;
        if (user.fetching || !user.fetched) {
            return loading;
        }
        if (user.logging_out) {
            console.log('LOGGING OUT');
            axios
                .get('/logout', { params: { username: user._id } })
                .then(response => {
                    console.log(response.data);
                    if (response.data) {
                        document.location.href = '/';
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            return loading;
        }
        let routes;
        if (user.type === types.typeStudent) {
            console.log('Student logged in');
            routes = studentRoutes;
        } else if (user.type === types.typeTutor) {
            console.log('Tutor logged in');
            routes = tutorRoutes;
            if (!user.online) {
                socket.emit('tutor-login');
            }
        } else if (user.type === types.typeAdmin) {
            console.log('Admin logged in');
            return adminRoutes;
        }
        return (
            <div className="animated fadeInDown">
                <BrowserRouter>
                    <div data-toggle="tooltip">
                        <Route path="/dash" component={DashMenuBar} />
                        <Switch>{routes}</Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

DashComp.propTypes = {
    fetchUserAndInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchUserAndInfo: () => dispatch(fetchUserAndInfo())
});

const DashComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashComp);

ReactDOM.render(
    <Provider store={store}>
        <DashComponent />
    </Provider>,
    document.getElementById('root')
);
