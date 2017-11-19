import React from 'react';
import { Link } from 'react-router-dom'
import { Nav, Navbar, MenuItem } from 'react-bootstrap';
import axios from 'axios';
import styles from '../../public/css/index.css';

export default class HomeMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.warn('Logging out user');
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
    return (
      <Navbar collapseOnSelect className={styles.navigationbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.navbarheader}>
            <Link to="#">Midtown Assistance Center</Link>
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
  }
}