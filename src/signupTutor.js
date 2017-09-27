import React from 'react';
import {Button, Modal, ControlLabel, Form, HelpBlock} from 'react-bootstrap';
import styles from '../public/css/login_signup.css';


class SignupTutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username:'',
            password:'',
            email:'',
            usernameValidation: '',
            passwordValidation: '',
            confirmPassword: '',
            confirmPasswordValidation: ''
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleUsernameChange(event) {
        let currentUsername = event.target.value;
        this.setState({ username: currentUsername });

        if (currentUsername.length < 4 && currentUsername.length !== 0) {
          this.setState({ usernameValidation: 'input-error'});
        } else {
          this.setState({ usernameValidation: 'input-success'});
        }
    }

    handlePasswordChange(event) {
        let currentPassword = event.target.value;
        this.setState({ password: currentPassword });

        if (currentPassword.length < 6 && currentPassword.length !== 0) {
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

    checkConfirmPassword(event) {
        let currentConfirmPassword = event.target.value;
        this.setState({ confirmPassword: currentConfirmPassword });

        if (currentConfirmPassword === this.state.password) {
          this.setState({ confirmPasswordValidation: 'input-success'});
        } else {
          this.setState({ confirmPasswordValidation: 'input-error'});
        }
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }



    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.firstName + ' ' + this.state.lastName);
        event.preventDefault();
    }

    render() {
        return (
        <div className="col-sm-4 col-sm-offset-4 text-center signup-form container">
            <h2 className="signup-header">SIGN UP</h2>
            <form className="" onSubmit={this.handleSubmit}>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange} />
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange} />
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className={this.state.usernameValidation + " input-lg col-md-10 col-md-offset-1"}
                    placeholder="Create A Username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange} />
                    <HelpBlock className={this.state.usernameValidation === 'input-error' ? 'show-error' : 'hide-error'}>Username must be at least 4 characters.</HelpBlock>
                </div>
                <div className="row col-md-12">
                    <input
                    type="password"
                    className={this.state.passwordValidation + " input-lg col-md-10 col-md-offset-1"}
                    placeholder="Create A Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange} />
                    <HelpBlock className={this.state.passwordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Password must be at least 6 characters.</HelpBlock>
                </div>
                <div className="row col-md-12">
                    <input
                    type="password"
                    className={this.state.confirmPasswordValidation + " input-lg col-md-10 col-md-offset-1"}
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.checkConfirmPassword}/>
                    <HelpBlock className={this.state.confirmPasswordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Passwords must match.</HelpBlock>
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Georgia Tech Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}/>
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Confirm Email"/>
                </div>
                <div className="row col-md-12">
                    <h5 className="signup-dialogue">Already have an account? <a className="signup-anchor" href='#'>Click here to log in!</a></h5>
                </div>
                <div className="row col-md-12">
                    <input
                    className="signup-button btn btn-lg btn-default col-md-4 col-md-offset-4"
                    type="submit"
                    value="SUBMIT" />
                </div>
            </form>
        </div>
        );
    }
}
export default SignupTutor;