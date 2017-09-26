import React from 'react';
import ReactDOM from 'react-dom';

class SignupTutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', username:'', password:'', email:''};

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    checkPasswords(event) {
        return event.target.value == this.password;
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
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange} />
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange} />
                </div>
                <div className="row col-md-12">
                    <input
                    type="text"
                    className="input-lg col-md-10 col-md-offset-1"
                    placeholder="Confirm Password"/>
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