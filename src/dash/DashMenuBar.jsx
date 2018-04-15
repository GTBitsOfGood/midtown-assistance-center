import React from 'react';
import { DropdownButton, MenuItem, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { setTutorOnline, saveTutor } from '../redux/actions/user_actions';
import styles from '../../public/css/index.css';
import socketIOClient from 'socket.io-client';
import * as types from '../redux/actions/types/user_types';
import axios from 'axios';

const SOCKETIO_ENDPOINT =
  window.location.hostname +
  (window.location.port ? ':' + window.location.port : '');
const socket = socketIOClient(SOCKETIO_ENDPOINT);

export class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

    logout() {
        console.warn('Logging out user');
        // this.props.setTutorOnline(this.props.user, {online: false, logging_out: true});
        console.log(this.props.user.type);
        if (this.props.user.type === types.typeTutor) {
            let self = this;
            axios.post('/api/checkActiveSession', {username:this.props.user._id})
                .then(function(response){
                    if (response.data.success) {
                        if (response.data.has_open_session) {
                            let session_date = new Date(response.data.session.start_time);
                            let endSession = confirm('Would you like to end your tutoring session that started at ' + session_date.toLocaleString('en-US'));
                            if (endSession) {
                                axios.post('/api/endTutorSession', {_id:response.data.session._id})
                                    .then(function(res){
                                        if (res.data.success) {
                                            let new_tutor = Object.assign({}, self.props.user);
                                            new_tutor.online = false;
                                            new_tutor.logging_out = true;
                                            self.props.setTutorOffline(new_tutor);
                                            socket.emit('tutor-logout');
                                        } else {
                                            console.log(res.data.error);
                                        }
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                    });
                            }
                        } else {
                            let new_tutor = Object.assign({}, self.props.user);
                            new_tutor.online = false;
                            new_tutor.logging_out = true;
                            self.props.setTutorOffline(new_tutor);
                            socket.emit('tutor-logout');
                        }
                    } else {
                        console.log(response.data.error);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        } else {
            let new_tutor = Object.assign({}, this.props.user);
            new_tutor.online = false;
            new_tutor.logging_out = true;
            this.props.setTutorOffline(new_tutor);
        }

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
            {window.location.pathname === '/dash/about' ? (
              <LinkContainer to="/dash">
                <MenuItem className={styles.navbartext}>Dashboard</MenuItem>
              </LinkContainer>
            ) : (
              <LinkContainer to="/dash/about">
                <MenuItem className={styles.navbartext}>About us</MenuItem>
              </LinkContainer>
            )}
          </Nav>
          <Nav pullRight>
            <span>
              <img
                className="nav-prof-pic"
                src={
                  this.props.user.profile_picture
                    ? this.props.user.profile_picture
                    : '/images/user.png'
                }
              />
            </span>
            <DropdownButton
              className="btn btn-sm dropdown-menu-button"
              title={this.props.user._id}
            >
              <LinkContainer to="#">
                <MenuItem>Messages</MenuItem>
              </LinkContainer>
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
              <MenuItem onClick={() => this.logout()}>Log Out</MenuItem>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
    setTutorOffline: tutor => dispatch(saveTutor(tutor)),
    setTutorOnline: (tutor, status) => dispatch(setTutorOnline(tutor, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
