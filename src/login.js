import React from 'react';
import ReactDOM from 'react-dom';
// import './Homepage.css';
import $ from 'jquery';
import styles from '../public/css/login_signup.css';
// import './mac.jpg'

class Loginpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    handleUsernameChange(e) {
       this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    sendToServer(e) {
        console.log('hello');
        e.preventDefault();
        $.post( "/login", this.state, function(data, status){
            if (data) {
                document.location.href = '/dash';
            }
        });
    }

    render() {
        return (
            <div className="col-sm-4 col-sm-offset-4 text-center login-form container">
                <h2 className="login-header">LOGIN</h2>
                <form onSubmit={this.sendToServer}>
                    <div className="row col-md-12">
                      <input
                      className="input-lg col-md-10 col-md-offset-1"
                      type="text"
                      name="fname"
                      value={this.state.username} 
                      onChange={this.handleUsernameChange}
                      placeholder="Enter Username">
                      </input>
                    </div>
                    <div className="row col-md-12">
                      <input
                      className="input-lg col-md-10 col-md-offset-1"
                      type="Password"
                      name="lname"
                      value={this.state.password} 
                      onChange={this.handlePasswordChange}
                      placeholder="Enter Password">
                      </input>
                    </div>
                    <div className="row col-md-12">
                      <input
                      className="login-button btn btn-lg btn-default col-md-10 col-md-offset-1"
                      type="submit"
                      value="SUBMIT"
                      ></input>
                    </div>
                    <div className="row col-md-12">
                        <a className="login-anchor" href="#">Forgot your password?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Loginpage;