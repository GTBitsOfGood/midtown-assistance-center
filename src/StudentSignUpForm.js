import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ControlLabel, Form, HelpBlock} from 'react-bootstrap';
import styles from '../public/css/login_signup.css';


class StudentSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameValidation: 'error',
      password: '',
      passwordValidation: 'error',
      confirmPassword: '',
      confirmPasswordValidation: 'success'
    };

    // Bindings
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    this.submitForm = this.submitForm.bind(this);

    // Other logic
    this.state.grades = [];
    for (let i = props.startingGrade; i <= props.endingGrade; i++) {
      this.state.grades.push(i);
    }
  }

  checkUsername(e) {
    let currentUsername = e.target.value;
    this.setState({ username: currentUsername });

    if (currentUsername.length < 4) {
      this.setState({ usernameValidation: 'error'});
    } else {
      this.setState({ usernameValidation: 'success'});
    }
  }

  checkPassword(e) {
    let currentPassword = e.target.value;
    this.setState({ password: currentPassword });

    if (currentPassword.length < 6) {
      this.setState({ passwordValidation: 'error'});
    } else {
      this.setState({ passwordValidation: 'success'});
    }

    if (currentPassword === this.state.confirmPassword) {
      this.setState({ confirmPasswordValidation: 'success'});
    } else {
      this.setState({ confirmPasswordValidation: 'error'});
    }
  }

  checkConfirmPassword(e) {
    let currentConfirmPassword = e.target.value;
    this.setState({ confirmPassword: currentConfirmPassword });

    if (currentConfirmPassword === this.state.password) {
      this.setState({ confirmPasswordValidation: 'success'});
    } else {
      this.setState({ confirmPasswordValidation: 'error'});
    }
  }

  submitForm() {
    // TODO
    //
    //validationState = {this.state.usernameValidation}

    //<Modal.Header>
      //<Modal.Title>Student Sign Up</Modal.Title>
    //</Modal.Header>

  }


  render() {
    return (
      <div className="col-sm-4 col-sm-offset-4 text-center signup-form container">
        <Form>
          <h2 className="signup-header">SIGNUP</h2>
          <div className="row col-md-12">
            <input
              id="inputsName"
              type="text"
              label="Text"
              placeholder="Your Name"
              className="input-lg col-md-10 col-md-offset-1"/>
          </div>
          <div className="row col-md-12">
            <input
              id="inputsUsername"
              type="text"
              placeholder="Create A Username"
              className="input-lg col-md-10 col-md-offset-1"
              value={this.state.username}
              onChange={this.checkUsername}/>
            <HelpBlock className="username-block">Username must be at least 4 characters.</HelpBlock>
          </div>
          <div className="row col-md-12">
            <input
              id="inputsPassword"
              label="Password"
              type="password"
              placeholder="Create A Password"
              className="input-lg col-md-10 col-md-offset-1"
              value={this.state.password}
              onChange={this.checkPassword}
            />
            <HelpBlock className="password-block">Password must be at least 6 characters.</HelpBlock>
          </div>
          <div className="row col-md-12">
            <input
              id="inputsConfirmPassword"
              label="Password"
              type="password"
              placeholder="Confirm Password"
              className="input-lg col-md-10 col-md-offset-1"
              value={this.state.confirmPassword}
              onChange={this.checkConfirmPassword}
            />
            <HelpBlock className="conf-password-block">Passwords must match.</HelpBlock>
          </div>
          <div className="row col-md-12">
            <input
              id="inputsEmail"
              type="email"
              label="Email address"
              className="input-lg col-md-10 col-md-offset-1"
              placeholder="Your Email"
            />
          </div>
          <div className="row col-md-12">
            <input
              id="inputsAccessCode"
              type="text"
              label="Text"
              className="input-lg col-md-10 col-md-offset-1"
              placeholder="Classroom Access Code"
            />
          </div>

          <div className="row col-md-12">
            <select className="select input-lg col-md-10 col-md-offset-1" placeholder="select">
            <option className="signup-select-option" selected>Select Grade Level</option>
              {this.state.grades.map(grade =>
                <option key={grade}>{grade}</option>
              )}
            </select>
          </div>
          <div className="row col-md-12">
            <h5 class="signup-dialogue">Already have an account? <a className="signup-anchor" href='./login'>Click here to log in!</a></h5>
          </div>
          <div className="row col-md-12">
              <input type="submit" className="signup-button btn btn-lg btn-default col-md-4 col-md-offset-4" onClick={this.submitForm} value="Submit">
              </input>
          </div>
        </Form>
        </div>
    );
  }
}

StudentSignUpForm.propTypes = {
  name: PropTypes.string,
  startingGrade: PropTypes.number,
  endingGrade: PropTypes.number
};

StudentSignUpForm.defaultProps = {
  name: 'Stranger',
  startingGrade: 6,
  endingGrade: 12
};

export default StudentSignUpForm;