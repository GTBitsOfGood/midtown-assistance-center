import React from 'react';
import ReactDOM from 'react-dom';
// import './Homepage.css';
import './login.css'
// import './mac.jpg'

class Loginpage extends React.Component {
    constructor(props) {
        super(props);
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
                    <form action="/action.php">
                      <input type="text" name="fname" placeholder="Username"></input><br></br>
                      <input type="Password" name="lname" placeholder="Password"></input><br></br>
                      <input type="submit" value="Submit"></input>
                    </form> 
                </div>
            </div>
            <div class="footer"></div>
         </div>
        );
    }
}

export default Loginpage;

// export default Homepage;
// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));
// ReactDOM.render(<Homepage/>, document.getElementById('root'));