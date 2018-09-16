import React from 'react';
import axios from 'axios';
import { HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../public/css/login_signup.css';

class SignUpTutor extends React.Component {
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
            gmail: '',
            gmailValidation: 'input-success',
            errorMessage: 'error-message-hide',
            inputErrorMessage: 'error-message-hide',
            errorMessageContent: '',
            availability: {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: []
            },
            disabledSubmit: false
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(
            this
        );
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
            this
        );
        this.handleGmailChange = this.handleGmailChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameChange(event) {
        const firstName = event.target.value;
        this.setState({ firstName });

        if (firstName === '') {
            this.setState({ firstNameValidation: 'input-error' });
        } else {
            this.setState({ firstNameValidation: 'input-success' });
        }
    }

    handleLastNameChange(event) {
        const lastName = event.target.value;
        this.setState({ lastName });

        if (lastName === '') {
            this.setState({ lastNameValidation: 'input-error' });
        } else {
            this.setState({ lastNameValidation: 'input-success' });
        }
    }

    handleUsernameChange(event) {
        const currentUsername = event.target.value;
        this.setState({ username: currentUsername });

        if (currentUsername.length < 4) {
            this.setState({ usernameValidation: 'input-error' });
        } else {
            this.setState({ usernameValidation: 'input-success' });
        }
    }

    handlePasswordChange(event) {
        const { confirmPassword } = this.state;
        const currentPassword = event.target.value;
        this.setState({ password: currentPassword });

        if (currentPassword.length < 6) {
            this.setState({ passwordValidation: 'input-error' });
        } else {
            this.setState({ passwordValidation: 'input-success' });
        }

        if (currentPassword === confirmPassword) {
            this.setState({ confirmPasswordValidation: 'input-success' });
        } else {
            this.setState({ confirmPasswordValidation: 'input-error' });
        }
    }

    handleConfirmPasswordChange(event) {
        const { password } = this.state;
        const currentConfirmPassword = event.target.value;
        this.setState({ confirmPassword: currentConfirmPassword });

        if (currentConfirmPassword === password) {
            this.setState({ confirmPasswordValidation: 'input-success' });
        } else {
            this.setState({ confirmPasswordValidation: 'input-error' });
        }
    }

    handleEmailChange(event) {
        const { confirmEmail } = this.state;
        const currentEmail = event.target.value;
        this.setState({ email: currentEmail });

        if (/@gatech.edu\s*$/.test(currentEmail)) {
            console.log('valid email');
            this.setState({ emailValidation: 'input-success' });
        } else {
            console.log('invalid email');
            this.setState({ emailValidation: 'input-error' });
        }

        if (currentEmail === confirmEmail) {
            this.setState({ confirmEmailValidation: 'input-success' });
        } else {
            this.setState({ confirmEmailValidation: 'input-error' });
        }
    }

    handleConfirmEmailChange(event) {
        const { email } = this.state;
        const currentConfirmEmail = event.target.value;
        this.setState({ confirmEmail: currentConfirmEmail });

        if (currentConfirmEmail === email) {
            this.setState({ confirmEmailValidation: 'input-success' });
        } else {
            this.setState({ confirmEmailValidation: 'input-error' });
        }
    }

    handleGmailChange(event) {
        const currentGmail = event.target.value;
        this.setState({ gmail: currentGmail });

        if (/@gmail.com\s*$/.test(currentGmail)) {
            this.setState({ gmailValidation: 'input-success' });
        } else {
            this.setState({ gmailValidation: 'input-error' });
        }
    }

    handleSubmit(event) {
        const {
            firstNameValidation,
            lastNameValidation,
            usernameValidation,
            passwordValidation,
            confirmPasswordValidation,
            emailValidation,
            confirmEmailValidation,
            gmailValidation
        } = this.state;
        event.preventDefault();
        if (
            firstNameValidation === 'input-error' ||
            lastNameValidation === 'input-error' ||
            usernameValidation === 'input-error' ||
            passwordValidation === 'input-error' ||
            confirmPasswordValidation === 'input-error' ||
            emailValidation === 'input-error' ||
            confirmEmailValidation === 'input-error' ||
            gmailValidation === 'input-error'
        ) {
            this.setState({ inputErrorMessage: 'error-message' });
            this.setState({ errorMessage: 'error-message-hide' });
        } else {
            // TODO: remove self = this
            const self = this;
            this.setState({ disabledSubmit: true });

            axios
                .post('/api/registerTutor', this.state)
                .then(response => {
                    console.log(response);
                    console.log(self.state.username);
                    if (response.data.success) {
                        axios
                            .post('/calendar/createNewCalendar', {
                                id: self.state.username,
                                email: self.state.gmail
                            })
                            .then(response => {
                                self.setState({ disabledSubmit: false });
                                axios
                                    .post('/calendar/addCalendarACL', {
                                        id: self.state.username,
                                        email: self.state.gmail,
                                        calendarId: response.data.calId
                                    })
                                    .then(res => {
                                        console.log(res);
                                        console.log('registration successful');
                                        document.location.href = '/home/login';
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        self.setState({
                                            disabledSubmit: false
                                        });
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                                self.setState({ disabledSubmit: false });
                            });
                    } else {
                        // registration failed
                        self.setState({ errorMessage: 'error-message' });
                        self.setState({
                            inputErrorMessage: 'error-message-hide'
                        });
                        self.setState({
                            errorMessageContent: response.data.error_message
                        });
                        self.setState({ disabledSubmit: false });
                    }
                })
                .catch(error => {
                    console.log(error);
                    self.setState({ errorMessage: 'error-message' });
                    self.setState({ inputErrorMessage: 'error-message-hide' });
                    self.setState({ disabledSubmit: false });
                });
        }
    }

    render() {
        const {
            firstNameValidation,
            firstName,
            lastNameValidation,
            lastName,
            usernameValidation,
            username,
            passwordValidation,
            password,
            confirmPasswordValidation,
            confirmPassword,
            emailValidation,
            email,
            confirmEmailValidation,
            confirmEmail,
            gmailValidation,
            gmail,
            inputErrorMessage,
            errorMessage,
            errorMessageContent,
            disabledSubmit
        } = this.state;
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${firstNameValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="First Name"
                        value={firstName}
                        onChange={this.handleFirstNameChange}
                    />
                    <HelpBlock
                        className={
                            firstNameValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Please enter your first name.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${lastNameValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={this.handleLastNameChange}
                    />
                    <HelpBlock
                        className={
                            lastNameValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Please enter your last name.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${usernameValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Create A Username"
                        value={username}
                        onChange={this.handleUsernameChange}
                    />
                    <HelpBlock
                        className={
                            usernameValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Username must be at least 4 characters.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="password"
                        className={`${passwordValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Create A Password"
                        value={password}
                        onChange={this.handlePasswordChange}
                    />
                    <HelpBlock
                        className={
                            passwordValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Password must be at least 6 characters.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="password"
                        className={`${confirmPasswordValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                    />
                    <HelpBlock
                        className={
                            confirmPasswordValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Passwords must match.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${emailValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Georgia Tech Email"
                        value={email}
                        onChange={this.handleEmailChange}
                    />
                    <HelpBlock
                        className={
                            emailValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Must be a valid Georgia Tech email.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${confirmEmailValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Confirm Email"
                        value={confirmEmail}
                        onChange={this.handleConfirmEmailChange}
                    />
                    <HelpBlock
                        className={
                            confirmEmailValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Emails must match.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        type="text"
                        className={`${gmailValidation} input-lg col-xs-10 col-xs-offset-1`}
                        placeholder="Gmail"
                        value={gmail}
                        onChange={this.handleGmailChange}
                    />
                    <HelpBlock
                        className={
                            gmailValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Gmail must be valid.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        className="signup-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                        type="submit"
                        value="SUBMIT"
                        disabled={disabledSubmit}
                        onClick={this.handleSubmit}
                    />
                </div>
                <h5 className={`col-xs-12 ${inputErrorMessage}`}>
                    one or more fields invalid
                </h5>
                <h5 className={`col-xs-12 ${errorMessage}`}>
                    {errorMessageContent}
                </h5>
                <div className="row col-xs-12">
                    <h5 className="signup-dialogue">
                        Already have an account?{' '}
                        <Link className="signup-anchor" to="/home/login">
                            Click here to log in!
                        </Link>
                    </h5>
                </div>
            </form>
        );
    }
}
export default SignUpTutor;
