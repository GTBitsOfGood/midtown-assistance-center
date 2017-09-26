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
            <div className="col-sm-4 col-sm-offset-4 text-center login-form container">
                <h2 className="login-header">LOGIN</h2>
                <form>
                    <div className="row col-md-12">
                      <input
                      className="input-lg col-md-10 col-md-offset-1"
                      type="text"
                      name="fname"
                      placeholder="Username">
                      </input>
                    </div>
                    <div className="row col-md-12">
                      <input
                      className="input-lg col-md-10 col-md-offset-1"
                      type="Password"
                      name="lname"
                      placeholder="Password">
                      </input>
                    </div>
                    <div className="row col-md-12">
                      <input
                      className="login-button btn btn-lg btn-default col-md-4 col-md-offset-4"
                      type="submit"
                      value="Submit"
                      ></input>
                    </div>
                    <div className="row col-md-12">
                        <a className="login-anchor" href="#">Forgot password</a>
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