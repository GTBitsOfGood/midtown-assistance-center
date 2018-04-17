import React from 'react';
import Approve from './pages/Approve.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navigation from './navigation/Navigation.jsx';
import Members from './Members.jsx';
import AddAdmin from './pages/AddAdmin.jsx';
import { Provider } from 'react-redux';
import store from '../../redux/store.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from '../../../public/css/admin.css';

class DefaultAdminDash extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <div className={styles.body}>
                    <Route path="/admin" component={Navigation} />
                    <Switch>
                        <div className={styles.body_wrapper}>
                            <Route
                                exact
                                path="/admin/dashboard"
                                component={Dashboard}
                            />
                            <Route
                                exact
                                path="/admin/approve"
                                component={Approve}
                            />
                            <Route
                                exact
                                path="/admin/add_admin"
                                component={AddAdmin}
                            />
                        </div>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default DefaultAdminDash;

ReactDOM.render(
    <Provider store={store}>
        <DefaultAdminDash />
    </Provider>,
    document.getElementById('root')
);
