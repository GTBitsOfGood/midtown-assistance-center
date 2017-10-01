import React from 'react';
import ReactDOM from 'react-dom';
// import './Homepage.css';
import styles from '../public/css/login_signup.css';
// import './mac.jpg'

class Loginpage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 text-center login-form container">
                <h2 className="login-header">LOGIN</h2>
                <form>
                    <div className="row col-xs-12">
                      <input
                      className="input-lg col-xs-10 col-xs-offset-1"
                      type="text"
                      name="fname"
                      placeholder="Enter Username">
                      </input>
                    </div>
                    <div className="row col-xs-12">
                      <input
                      className="input-lg col-xs-10 col-xs-offset-1"
                      type="Password"
                      name="lname"
                      placeholder="Enter Password">
                      </input>
                    </div>
                    <div className="row col-xs-12">
                      <input
                      className="login-button btn btn-lg btn-default col-xs-10 col-xs-offset-1"
                      type="submit"
                      value="SUBMIT"
                      ></input>
                    </div>
                    <div className="row col-xs-12">
                        <a className="login-anchor" href="#">Forgot your password?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Loginpage;

// export default Homepage;
// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));
// ReactDOM.render(<Homepage/>, document.getElementById('root'));