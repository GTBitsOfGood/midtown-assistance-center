import React from 'react';
import { Nav, Navbar, NavItem, MenuItem } from 'react-bootstrap';
import styles from '../public/css/index.css';
import { LinkContainer } from 'react-router-bootstrap';



export class HomeMenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect className={styles.navigationbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.navbarheader}>
            <a href="#">Midtown Assistance Center</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavItem className={styles.navbartext}>About us</NavItem>
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

export default HomeMenuBar;