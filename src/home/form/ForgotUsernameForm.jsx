import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../public/css/login_signup.css';

class ForgotUsernameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            success: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    sendToServer(e) {
        e.preventDefault();
        const { email } = this.state;

        axios
            .post('/api/forgotUsername', { email } )
            .then(response => {
                if (response.data.success) {
                    this.setState({ message: `Email sent to ${ email } with your username.` });
                    this.setState({ success: true});
                } else {
                    this.setState({ message: 'No account found with that email.' });
                }
            })
            .catch(() => {
                this.setState({ message: 'Request failed. Please try again later' });
            });
    }

    render() {
        const { email, message, success } = this.state;
        const messageDiv = message ? (<div className='text-white'>{message}</div>) : null;
        return (
            <div className="bkgrd">
                <div className="animated fadeInLeft text-center forgot-pass-form">
                    <div className="vert-center">
                        <h3 className="forgot-pass-header">Forgot Your Username?</h3>
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
                                {success ?
                                    <Link
                                        className="animated bounce forgot-pass-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                                        to='login'>
                                        Back to Login Page
                                    </Link> :
                                    <input
                                        style={{ animationDelay: '2s' }}
                                        className="animated bounce forgot-pass-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                                        type="submit"
                                        value="SUBMIT"
                                    />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotUsernameForm;
