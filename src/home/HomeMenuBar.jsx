import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import styles from '../../public/css/index.css';

export default class HomeMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        console.warn('Logging out user');
        axios
            .get('/logout')
            .then(function(response) {
                console.log(response);
                if (response.data === true) {
                    document.location.href = '/';
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            // TODO: change from react-bootstrap to web bootstrap to get rid of warnings
            <Navbar collapseOnSelect className={styles.navigationbar}>
                <Navbar.Header>
                    <Navbar.Brand className={styles.navbarheader}>
                        <Link to="/home/about">Midtown Assistance Center</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullLeft>
                        <LinkContainer to="/home/about">
                            <MenuItem className={styles.navbartext}>
                                About Us
                            </MenuItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/home/login">
                            <MenuItem className={styles.navbartext}>
                                Sign In
                            </MenuItem>
                        </LinkContainer>
                        <LinkContainer to="/home/signup">
                            <MenuItem className={styles.navbartext}>
                                Sign Up
                            </MenuItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
