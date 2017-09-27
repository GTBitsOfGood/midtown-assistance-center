import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import styles from '../public/css/index.css';



export class HomeMenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect className={styles.navigationbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Midtown Assistance Center</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavItem>About us</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Sign In</NavItem>
            <NavItem eventKey={2} href="#">Sign Up</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HomeMenuBar;