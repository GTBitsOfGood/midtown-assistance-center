import React from 'react';
import styles from '../public/css/index.css';
import { Nav, Navbar, NavItem, MenuItem, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUserAction } from './redux/userActions.js';
import axios from 'axios';

export class homeMenuBar extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    var self = this;
    axios.get('/user')
          .then(function (response) {
                  if (response.data !== '') {
                    console.log(response.data);
                    self.props.setUser(response.data);
                  }
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  logout() {
    axios.get('/logout').then(function(response) {
        console.log(response);
        if (response.data === true) {
            document.location.href='/';

        }
    }).catch(function(error) {
        console.log(error);
    });
  }



  render() {
    if (this.props.homeordash === "home") {
    return (
      <Navbar collapseOnSelect className={styles.navigationbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.navbarheader}>
            <a href="/home/about">Midtown Assistance Center</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <MenuItem href="/home/about" className={styles.navbartext}>About Us</MenuItem>
          </Nav>
          <Nav pullRight>
            <MenuItem href="/home/login" className={styles.navbartext}>Sign In</MenuItem>
            <MenuItem href="/home/signUp" className={styles.navbartext}>Sign Up</MenuItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    } else if (this.props.homeordash === "dash") {
    return (
      <Navbar collapseOnSelect className={styles.navigationbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.navbarheader}>
            <a href="/dash">Midtown Assistance Center</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <MenuItem className={styles.navbartext} href="/dash/about">About us</MenuItem>
          </Nav>
          <Nav pullRight>
            <DropdownButton className="btn btn-sm dropdown-menu-button" title={this.props.user}>
                <MenuItem href="#">Usage</MenuItem>
                <MenuItem href="#">Edit Profile</MenuItem>
                <MenuItem onClick={() => this.logout()} className={styles.navbartext}>Log Out</MenuItem>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    }

  }
}

const mapStateToProps = (state) => {
	console.log(state);
  return {
    user : state.user.username,
    password: state.user.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch(setUserAction(user))
  }
}

const HomeMenuBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(homeMenuBar);

export default HomeMenuBar;