import React from 'react';
import PropTypes from 'prop-types';
import { HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../public/css/login_signup.css';

class StudentSignUpForm extends React.Component {
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
            access_code: '',
            grade_level: 'default',
            gradeLevelValidation: 'input-error',
            errorMessage: 'error-message-hide',
            inputErrorMessage: 'error-message-hide',
            errorMessageContent: '',
            grades: []
        };

        // Bindings
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
            this
        );
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAccessCodeChange = this.handleAccessCodeChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const grades = [];
        for (let i = props.startingGrade; i <= props.endingGrade; i++) {
            grades.push(i);
        }
        this.state.grades = grades;
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
        const currentEmail = event.target.value;
        this.setState({ email: currentEmail });

        /* checks for basic format: "..."@ "..." . "..."
            where "..." can include any character
         */
        if (/\S+@\S+\.\S+/.test(currentEmail)) {
            this.setState({ emailValidation: 'input-success' });
        } else {
            this.setState({ emailValidation: 'input-error' });
        }
    }

    handleAccessCodeChange(event) {
        this.setState({ access_code: event.target.value });
    }

    handleGradeChange(event) {
        const currentGrade = event.target.value;
        this.setState({ grade_level: currentGrade });
        if (currentGrade !== 'default') {
            this.setState({ gradeLevelValidation: 'input-success' });
        } else {
            this.setState({ gradeLevelValidation: 'input-error' });
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
            gradeLevelValidation
        } = this.state;
        event.preventDefault();
        if (
            firstNameValidation === 'input-error' ||
            lastNameValidation === 'input-error' ||
            usernameValidation === 'input-error' ||
            passwordValidation === 'input-error' ||
            confirmPasswordValidation === 'input-error' ||
            emailValidation === 'input-error' ||
            gradeLevelValidation === 'input-error'
        ) {
            this.setState({ inputErrorMessage: 'error-message' });
            this.setState({ errorMessage: 'error-message-hide' });
        } else {
            // TODO: remove self=this
            const self = this;
            axios
                .post('/api/registerStudent', this.state)
                .then(response => {
                    console.log(response);
                    if (response.data.success) {
                        document.location.href = '/home/login';
                        console.log('registration successful');
                    } else {
                        // Registration error
                        self.setState({ errorMessage: 'error-message' });
                        self.setState({
                            inputErrorMessage: 'error-message-hide'
                        });
                        self.setState({
                            errorMessageContent: response.data.error_message
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    self.setState({ errorMessage: 'error-message' });
                    self.setState({ inputErrorMessage: 'error-message-hide' });
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
            access_code,
            grade_level,
            gradeLevelValidation,
            grades,
            inputErrorMessage,
            errorMessage,
            errorMessageContent
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
                        placeholder="Your Email"
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
                        Email must be valid.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        id="inputsAccessCode"
                        type="text"
                        label="Text"
                        value={access_code}
                        onChange={this.handleAccessCodeChange}
                        className="input-lg col-xs-10 col-xs-offset-1"
                        placeholder="Classroom Access Code"
                    />
                    <a href="#" title="This is a unique code that tells us what classroom you're a part of. If you don't know what to enter for this, please ask your teacher to provide it." className="form-tooltip">
                        <small title="">What is this?</small>
                    </a>
                </div>
                <div className="row col-xs-12">
                    <select
                        style={{ height: '60px' }}
                        className="select input-lg col-xs-10 col-xs-offset-1"
                        placeholder="select"
                        value={grade_level}
                        onChange={this.handleGradeChange}
                    >
                        <option value="default" className="signup-select-option">
                            <span>
                                Select Grade Level
                            </span>
                        </option>
                        {grades.map(grade => (
                            <option value={grade} className="signup-select-option">
                                {grade}
                            </option>
                        ))}
                    </select>
                    <HelpBlock
                        className={
                            gradeLevelValidation === 'input-error'
                                ? 'show-error'
                                : 'hide-error'
                        }
                    >
                        Grade level must be set.
                    </HelpBlock>
                </div>
                <div className="row col-xs-12">
                    <input
                        className="signup-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                        type="submit"
                        value="SUBMIT"
                        onClick={this.handleSubmit}
                    />
                </div>
                <h5 className={`col-xs-12 ${inputErrorMessage}`}>
                    One or more fields invalid
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

StudentSignUpForm.propTypes = {
    startingGrade: PropTypes.number,
    endingGrade: PropTypes.number
};

StudentSignUpForm.defaultProps = {
    startingGrade: 1,
    endingGrade: 12
};

export default StudentSignUpForm;
