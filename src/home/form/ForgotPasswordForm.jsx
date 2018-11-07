import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../public/css/login_signup.css';

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    setMessage(message) {
        this.setState({ message });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    sendToServer(e) {
        e.preventDefault();
        const { email } = this.state;

        axios
            .post('/api/forgotPassword', { email } )
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    this.setMessage(`Email sent to ${ email } with a link to reset your password.`);
                } else {
                    this.setMessage('No account found with that email.');
                }
            })
            .catch(error => {
                console.log(error);
                this.setMessage('Request failed. Please try again later');
            });
    }

    render() {
        const { email, message } = this.state;
        const messageDiv = message ? (<div className='text-white'>{message}</div>) : null;
        return (
            <div>
                <div className="bkgrd" />
                <div className="animated fadeInRight">
                    <div className="forgot-pass-bkgrd col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" />
                    <div className="animated fadeInRight col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center forgot-pass-form container">
                        <div className="vert-center">
                            <h3 className="forgot-pass-header">Forgot Your Password?</h3>
                            {messageDiv}
                            <form onSubmit={this.sendToServer}>
                                <div className="row col-xs-12">
                                    <input
                                        className="input-lg col-xs-10 col-xs-offset-1"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={this.handleEmailChange}
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                                <div className="row col-xs-12">
                                    <input
                                        style={{ animationDelay: '2s' }}
                                        className="animated bounce forgot-pass-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                                        type="submit"
                                        value="SUBMIT"
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

export default ForgotPasswordForm;
