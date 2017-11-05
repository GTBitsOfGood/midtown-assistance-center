import React from 'react';
import styles from '../public/css/index.css';
import { Nav, Navbar, NavItem, MenuItem, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';

export class homeMenuBar extends React.Component {
    constructor(props) {
        super(props);

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
        if (this.props.homeordash === 'home') {
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
                            <MenuItem href="/home/about" className={styles.navbartext}>About Us</MenuItem>
                        </Nav>
                        <Nav pullRight>
                            <MenuItem href="/home/login" className={styles.navbartext}>Sign In</MenuItem>
                            <MenuItem href="/home/signUp" className={styles.navbartext}>Sign Up</MenuItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else if (this.props.homeordash === 'dash') {
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
                            <MenuItem onClick={() => this.logout()} className={styles.navbartext}>{this.props.user.username}</MenuItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const HomeMenuBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(homeMenuBar);

export default HomeMenuBar;