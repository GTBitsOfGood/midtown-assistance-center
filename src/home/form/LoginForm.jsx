import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../public/css/login_signup.css';

class Loginpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: 'error-message-hide'
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    setErrorMessage() {
        this.setState({ errorMessage: 'error-message' });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    sendToServer(e) {
        e.preventDefault();

        const { username, password } = this.state;

        const userDetails = {
            username,
            password,
            logInTime: Date.now()
        };
        // Look at passportConfig.js /login endpoint
        axios
            .post('/login', userDetails)
            .then(response => {
                if (response.data !== '') {
                    document.location.href = '/dash';
                } else {
                    console.log(response.data);
                    this.setErrorMessage();
                }
            })
            .catch(error => {
                console.log(error);
                this.setErrorMessage();
            });
    }

    render() {
        const { username, password, errorMessage } = this.state;
        return (
            <div>
                <div className="bkgrd" />
                <div className="animated fadeInRight">
                    <div className="login-form-bkgrd col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" />
                    <div className="animated fadeInRight col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center login-form container">
                        <div className="vert-center">
                            <h3 className="login-header">Login</h3>
                            <form onSubmit={this.sendToServer}>
                                <div className="row col-xs-12">
                                    <input
                                        className="input-lg col-xs-10 col-xs-offset-1"
                                        type="text"
                                        name="fname"
                                        value={username}
                                        onChange={this.handleUsernameChange}
                                        placeholder="Enter Username"
                                    />
                                </div>
                                <div className="row col-xs-12">
                                    <input
                                        className="input-lg col-xs-10 col-xs-offset-1"
                                        type="Password"
                                        name="lname"
                                        value={password}
                                        onChange={this.handlePasswordChange}
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <div className="row col-xs-12">
                                    <input
                                        style={{ animationDelay: '2s' }}
                                        className="animated bounce login-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                                        type="submit"
                                        value="SUBMIT"
                                    />
                                </div>
                                <h5 className={`col-xs-12 ${errorMessage}`}>
                                    username or password incorrect
                                </h5>
                                <div className="row col-xs-12">
                                    {/* TODO: implement forgot password link */}
                                    <Link className="login-anchor" to="foobar">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loginpage;
