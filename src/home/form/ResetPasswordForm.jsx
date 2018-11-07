import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../public/css/login_signup.css';

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            resultMessage: '',
            errorMessage: ''
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.setResultMessage = this.setResultMessage.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    setResultMessage(resultMessage) {
        this.setState({ resultMessage });
    }

    setErrorMessage(errorMessage) {
        this.setState({ errorMessage });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
        const {confirmPassword } = this.state;
        if (e.target.value !== confirmPassword) {
            this.setErrorMessage('Passwords do not match.');
        } else {
            this.setErrorMessage('');
        }
    }

    handleConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value });
        const { password } = this.state;
        if (e.target.value !== password) {
            this.setErrorMessage('Passwords do not match.');
        } else {
            this.setErrorMessage('');
        }
    }

    sendToServer(e) {
        e.preventDefault();
        const { password } = this.state;

        axios
            .patch('/api/resetPassword', { password })
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    this.setResultMessage('Password has been reset.');
                } else {
                    this.setResultMessage('Error resetting password');
                }
            })
            .catch(error => {
                console.log(error);
                this.setResultMessage('Request failed. Please try again later');
            });
    }

    render() {
        const { password, confirmPassword, resultMessage, errorMessage } = this.state;
        const resultMessageDiv = resultMessage ? (<div className='text-white'>{resultMessage}</div>) : null;
        const errorMessageDiv = errorMessage ? (<div className='help-block'>{errorMessage}</div>) : null;
        return (
            <div>
                <div className="bkgrd" />
                <div className="animated fadeInRight">
                    <div className="reset-pass-bkgrd col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" />
                    <div className="animated fadeInRight col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center reset-pass-form container">
                        <div className="vert-center">
                            <h3 className="reset-pass-header">Reset Your Password</h3>
                            {resultMessageDiv}
                            <form onSubmit={this.sendToServer}>
                                <div className="row col-xs-12">
                                    <input
                                        className="input-lg col-xs-10 col-xs-offset-1"
                                        type="password"
                                        name="password"
                                        value={ password }
                                        onChange={this.handlePasswordChange}
                                        placeholder="Enter New Password"
                                    />
                                </div>
                                <div className="row col-xs-12">
                                    <input
                                        className="input-lg col-xs-10 col-xs-offset-1"
                                        type="password"
                                        name="confirmPassword"
                                        value={ confirmPassword }
                                        onChange={this.handleConfirmPasswordChange}
                                        placeholder="Confirm New Password"
                                    />
                                </div>
                                {errorMessageDiv}
                                <div className="row col-xs-12">
                                    <input
                                        style={{ animationDelay: '2s' }}
                                        className="reset-pass-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                                        type="submit"
                                        value="SUBMIT"
                                        disabled={errorMessage}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPasswordForm;
