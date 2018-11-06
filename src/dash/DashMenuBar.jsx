import React from 'react';
import { DropdownButton, MenuItem, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';

import { setTutorOnline, saveTutor } from '../redux/actions/user_actions';
import styles from '../../public/css/index.css';
import * as types from '../redux/actions/types/user_types';

const SOCKETIO_ENDPOINT =
    window.location.hostname +
    (window.location.port ? `:${window.location.port}` : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

export class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const { user, setTutorOffline } = this.props;
        console.warn('Logging out user');
        // this.props.setTutorOnline(user, {online: false, logging_out: true});
        console.log(user.type);
        if (user.type === types.typeTutor) {
            // TODO: remove self = this
            const self = this;
            axios
                .post('/api/checkActiveSession', {
                    username: user._id
                })
                .then(response => {
                    if (response.data.success) {
                        if (response.data.has_open_session) {
                            const session_date = new Date(
                                response.data.session.start_time
                            );
                            // eslint-disable-next-line no-restricted-globals, no-alert
                            const endSession = confirm(
                                `Would you like to end your tutoring session that started at
                                    ${session_date.toLocaleString('en-US')}`
                            );
                            if (endSession) {
                                axios
                                    .post('/api/endTutorSession', {
                                        _id: response.data.session._id
                                    })
                                    .then(res => {
                                        if (res.data.success) {
                                            const new_tutor = Object.assign(
                                                {},
                                                self.props.user
                                            );
                                            new_tutor.online = false;
                                            new_tutor.logging_out = true;
                                            self.props.setTutorOffline(
                                                new_tutor
                                            );
                                            socket.emit('tutor-logout');
                                        } else {
                                            console.log(res.data.error);
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }
                        } else {
                            const new_tutor = Object.assign(
                                {},
                                self.props.user
                            );
                            new_tutor.online = false;
                            new_tutor.logging_out = true;
                            self.props.setTutorOffline(new_tutor);
                            socket.emit('tutor-logout');
                        }
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const new_tutor = Object.assign({}, user);
            new_tutor.online = false;
            new_tutor.logging_out = true;
            setTutorOffline(new_tutor);
        }
    }

    render() {
        const { user } = this.props;
        return (
            <Navbar collapseOnSelect className={styles.navigationbar}>
                <Navbar.Header>
                    <Navbar.Brand className={styles.navbarheader}>
                        <Link to="/dash">Midtown Assistance Center</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullLeft>
                        {window.location.pathname === '/dash/about' ? (
                            <LinkContainer to="/dash">
                                <MenuItem className={styles.navbartext}>
                                    Dashboard
                                </MenuItem>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/dash/about">
                                <MenuItem className={styles.navbartext}>
                                    About us
                                </MenuItem>
                            </LinkContainer>
                        )}
                    </Nav>
                    <Nav pullRight>
                        <span>
                            <img
                                alt="profile pic"
                                className="nav-prof-pic"
                                src={
                                    user.profile_picture
                                        ? user.profile_picture
                                        : '/images/user.png'
                                }
                            />
                        </span>
                        <DropdownButton
                            className="btn btn-sm dropdown-menu-button"
                            title={user._id}
                        >
                            {window.location.pathname === '/dash/profile' ? (
                                <LinkContainer to="/dash">
                                    <MenuItem>Dashboard</MenuItem>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to="/dash/profile">
                                    <MenuItem>Edit Profile</MenuItem>
                                </LinkContainer>
                            )}
                            <MenuItem divider />
                            <MenuItem onClick={() => this.logout()}>
                                Log Out
                            </MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

MenuBar.propTypes = {
    user: PropTypes.object.isRequired,
    setTutorOffline: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setTutorOffline: tutor => dispatch(saveTutor(tutor)),
    setTutorOnline: (tutor, status) => dispatch(setTutorOnline(tutor, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
