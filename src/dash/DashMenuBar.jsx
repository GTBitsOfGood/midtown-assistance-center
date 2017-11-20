import React from 'react';
import { Nav, Navbar, MenuItem, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import styles from '../../public/css/index.css';

export class MenuBar extends React.Component {
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
              <span><img className="nav-prof-pic" src='/images/user.png'></img></span>
              <DropdownButton className="btn btn-sm dropdown-menu-button" title={this.props.user._id}>
                <LinkContainer to="#">
                  <MenuItem>Usage</MenuItem>
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
      user: {
        _id: state.user._id,
      }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);