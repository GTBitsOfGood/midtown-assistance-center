import React from 'react';
import { Nav, Navbar, MenuItem, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { saveTutor } from '../redux/actions/user_actions.js';
import axios from 'axios';
import styles from '../../public/css/index.css';
import socketIOClient from 'socket.io-client';

const SOCKETIO_ENDPOINT = window.location.hostname+(window.location.port ? ':'+window.location.port: '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

export class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        console.warn('Logging out user');
        let new_tutor = Object.assign({}, this.props.user);
        new_tutor.online = false;
        new_tutor.logging_out = true;
        socket.emit('tutor-logout');
        this.props.setTutorOffline(new_tutor);
    }


    render() {
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
                        {window.location.pathname === '/dash/about' ?
                            <LinkContainer to="/dash">
                                <MenuItem className={styles.navbartext}>Dashboard</MenuItem>
                            </LinkContainer>
                            :
                            <LinkContainer to="/dash/about">
                                <MenuItem className={styles.navbartext}>About us</MenuItem>
                            </LinkContainer>
                        }
                    </Nav>
                    <Nav pullRight>
                        <span><img className="nav-prof-pic" src={this.props.user.profile_picture ? this.props.user.profile_picture : '/images/user.png'}/></span>
                        <DropdownButton className="btn btn-sm dropdown-menu-button" title={this.props.user._id}>
                            <LinkContainer to="#">
                                <MenuItem>Messages</MenuItem>
                            </LinkContainer>
                            {
                                window.location.pathname === '/dash/profile' ?
                                    <LinkContainer to="/dash">
                                        <MenuItem>Dashboard</MenuItem>
                                    </LinkContainer>
                                    :
                                    <LinkContainer to="/dash/profile">
                                        <MenuItem>Edit Profile</MenuItem>
                                    </LinkContainer>
                            }
                            <MenuItem divider/>
                            <MenuItem onClick={() => this.logout()}>Log Out</MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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
        setTutorOffline: (tutor) => dispatch(saveTutor(tutor))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);