import React from 'react';
import ReactDOM from 'react-dom';
// import './Homepage.css';
import styles from '../../../public/css/login_signup.css';
import axios from 'axios';

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

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    setErrorMessage() {
        this.setState({errorMessage:'error-message'});
    }

    sendToServer(e) {
        e.preventDefault();
        let self = this;

        let userDetails = {
          username: this.state.username,
          password: this.state.password,
          logInTime:Date.now()
        };

        axios.post('/login', userDetails)
            .then(function (response) {
                if (response.data !== '') {
                    document.location.href = '/dash';
                } else {
                    console.log(response.data);
                    self.setErrorMessage();
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setErrorMessage();
            });

    }

    render() {
        return (
            <div className="animated fadeInRight col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center login-form container">
                <h2 className="login-header">LOGIN</h2>
                <form onSubmit={this.sendToServer}>
                    <div className="row col-xs-12">
                        <input
                            className="input-lg col-xs-10 col-xs-offset-1"
                            type="text"
                            name="fname"
                            value={this.state.username} 
                            onChange={this.handleUsernameChange}
                            placeholder="Enter Username">
                        </input>
                    </div>
                    <div className="row col-xs-12">
                        <input
                            className="input-lg col-xs-10 col-xs-offset-1"
                            type="Password"
                            name="lname"
                            value={this.state.password} 
                            onChange={this.handlePasswordChange}
                            placeholder="Enter Password">
                        </input>
                    </div>
                    <div className="row col-xs-12">
                        <input
                            style = {{animationDelay: '2s'}}
                            className="animated bounce login-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                            type="submit"
                            value="SUBMIT"/>
                    </div>
                    <h5 className={'col-xs-12 ' + this.state.errorMessage}>username or password incorrect</h5>
                    <div className="row col-xs-12">
                        <a className="login-anchor" href="#">Forgot your password?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Loginpage;