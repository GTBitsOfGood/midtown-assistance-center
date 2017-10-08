import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import styles from '../../../public/css/index.css';

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
          <Nav pullRight >
            <NavItem eventKey={1} href="#" className={styles.navbartext}>Sign In</NavItem>
            <NavItem eventKey={2} href="#" className={styles.navbartext}>Sign Up</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HomeMenuBar;