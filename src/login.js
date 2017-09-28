import React from 'react';
import ReactDOM from 'react-dom';
// import './Homepage.css';
import styles from './login.css';
import $ from 'jquery';
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
          <div className="wrap">
            <div className="header">
                <img src="mac.jpg" alt="" height="100%"></img>
                <button type="button">About</button>
                <button type="button">Sign Up</button>
                <button type="button">Login</button>
            </div>
            <div className="inputbox">
                <div className="formarea">
                    <h1>Login</h1>
                    <form onSubmit={this.sendToServer}>
                      <input type="text" name="fname" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}></input><br></br>
                      <input type="Password" name="lname" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
                      <input type="submit" value="Submit"></input>
                    </form> 
                </div>
            </div>
            <div className="footer"></div>
         </div>
        );
    }
}

export default Loginpage;

// export default Homepage;
// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));
// ReactDOM.render(<Homepage/>, document.getElementById('root'));