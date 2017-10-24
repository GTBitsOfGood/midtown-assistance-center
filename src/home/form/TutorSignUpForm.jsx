import React from 'react';
import axios from 'axios';
import {HelpBlock} from 'react-bootstrap';
import styles from '../../../public/css/login_signup.css';

class SignupTutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            firstNameValidation: 'input-success',
            lastName: '',
            lastNameValidation: 'input-success',
            username: '',
            usernameValidation: 'input-error',
            password: '',
            passwordValidation: 'input-error',
            confirmPassword: '',
            confirmPasswordValidation: 'input-success',
            email: '',
            emailValidation: 'input-success',
            confirmEmail: '',
            confirmEmailValidation: 'input-success',
            errorMessage: 'error-message-hide',
            inputErrorMessage:'error-message-hide'
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameChange(event) {
        let firstName = event.target.value;
        this.setState({firstName: firstName});

        if (firstName === '') {
            this.setState({ firstNameValidation: 'input-error'});
        } else {
            this.setState({ firstNameValidation: 'input-success'});
        }
    }

    handleLastNameChange(event) {
        let lastName = event.target.value;
        this.setState({lastName: lastName});

        if (lastName === '') {
            this.setState({ lastNameValidation: 'input-error'});
        } else {
            this.setState({ lastNameValidation: 'input-success'});
        }
    }

    handleUsernameChange(event) {
        let currentUsername = event.target.value;
        this.setState({ username: currentUsername });

        if (currentUsername.length < 4) {
            this.setState({ usernameValidation: 'input-error'});
        } else {
            this.setState({ usernameValidation: 'input-success'});
        }
    }

    handlePasswordChange(event) {
        let currentPassword = event.target.value;
        this.setState({ password: currentPassword });

        if (currentPassword.length < 6) {
            this.setState({ passwordValidation: 'input-error'});
        } else {
            this.setState({ passwordValidation: 'input-success'});
        }

        if (currentPassword === this.state.confirmPassword) {
            this.setState({ confirmPasswordValidation: 'input-success'});
        } else {
            this.setState({ confirmPasswordValidation: 'input-error'});
        }
    }

    handleConfirmPasswordChange(event) {
        let currentConfirmPassword = event.target.value;
        this.setState({ confirmPassword: currentConfirmPassword });

        if (currentConfirmPassword === this.state.password) {
            this.setState({ confirmPasswordValidation: 'input-success'});
        } else {
            this.setState({ confirmPasswordValidation: 'input-error'});
        }
    }

    handleEmailChange(event) {
        let currentEmail = event.target.value;
        this.setState({email: currentEmail});

        // TODO email validation
        if (currentEmail.includes('@')) {
            this.setState({ emailValidation: 'input-success'});
        } else {
            this.setState({ emailValidation: 'input-error'});
        }

        if (currentEmail === this.state.confirmEmail) {
            this.setState({ confirmEmailValidation: 'input-success'});
        } else {
            this.setState({ confirmEmailValidation: 'input-error'});
        }
    }

    handleConfirmEmailChange(event) {
        let currentConfirmEmail = event.target.value;
        this.setState({ confirmEmail: currentConfirmEmail });

        if (currentConfirmEmail === this.state.email) {
            this.setState({ confirmEmailValidation: 'input-success'});
        } else {
            this.setState({ confirmEmailValidation: 'input-error'});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstNameValidation === 'input-error' ||
            this.state.lastNameValidation === 'input-error' ||
            this.state.usernameValidation === 'input-error' ||
            this.state.passwordValidation === 'input-error' ||
            this.state.confirmPasswordValidation === 'input-error' ||
            this.state.emailValidation === 'input-error' ||
            this.state.confirmEmailValidation === 'input-error') {
            this.setState({inputErrorMessage:'error-message'});
            this.setState({errorMessage:'error-message-hide'});
        } else {
            var self = this;
            axios.post('/api/registerTutor', this.state)
                .then(function (response) {
                    console.log(response);
                    if (response.data) {
                        document.location.href = '/home/login';
                        console.log("registration successful");
                    } else {
                        //registration failed
                        self.setState({errorMessage:'error-message'});
                        self.setState({inputErrorMessage:'error-message-hide'});

                    }

                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({errorMessage:'error-message'});
                    self.setState({inputErrorMessage:'error-message-hide'});
                });
        }
    }

    render() {
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={this.state.firstNameValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange} />
                    <HelpBlock className={this.state.firstNameValidation === 'input-error' ? 'show-error' : 'hide-error'}>Please enter your first name.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={this.state.lastNameValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange} />
                    <HelpBlock className={this.state.lastNameValidation === 'input-error' ? 'show-error' : 'hide-error'}>Please enter your last name.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={this.state.usernameValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Create A Username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange} />
                    <HelpBlock className={this.state.usernameValidation === 'input-error' ? 'show-error' : 'hide-error'}>Username must be at least 4 characters.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="password"
                        className={this.state.passwordValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Create A Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
                    <HelpBlock className={this.state.passwordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Password must be at least 6 characters.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="password"
                        className={this.state.confirmPasswordValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}/>
                    <HelpBlock className={this.state.confirmPasswordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Passwords must match.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={this.state.emailValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Georgia Tech Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}/>
                    <HelpBlock className={this.state.emailValidation === 'input-error' ? 'show-error' : 'hide-error'}>Email must be valid.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={this.state.confirmEmailValidation + ' input-lg col-xs-10 col-xs-offset-1'}
                        placeholder="Confirm Email"
                        value={this.state.confirmEmail}
                        onChange={this.handleConfirmEmailChange}/>
                    <HelpBlock className={this.state.confirmEmailValidation === 'input-error' ? 'show-error' : 'hide-error'}>Emails must match.</HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        className="signup-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                        type="submit"
                        value="SUBMIT"
                        onClick={this.handleSubmit}/>
                </div>
                <h5 className={'col-xs-12 ' + this.state.inputErrorMessage}>one or more fields invalid</h5>
                <h5 className={'col-xs-12 ' + this.state.errorMessage}>this username already exists</h5>
                <div className="row col-xs-12">
                    <h5 className="signup-dialogue">Already have an account? <a className="signup-anchor" href='/home/login'>Click here to log in!</a></h5>
                </div>

            </form>
        );
    }
}
export default SignupTutor;