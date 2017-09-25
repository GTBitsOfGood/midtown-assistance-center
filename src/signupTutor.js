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
        <div className="col-md-8 col-md-offset-2 jumbotron text-center">
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Confirm Password"/>
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Georgia Tech Email" value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div className="row col-md-12">
                    <input type="text" className="input-lg col-md-8 col-md-offset-2" placeholder="Confirm Email"/>
                </div>
                <div className="row col-md-12">
                    <input className="btn btn-lg btn-primary col-md-8 col-md-offset-2" type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
        );
      }
}
export default SignupTutor;