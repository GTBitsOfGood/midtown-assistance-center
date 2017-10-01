import React from 'react';
import PropTypes from 'prop-types';
import { Form, HelpBlock } from 'react-bootstrap';


class StudentSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameValidation: '',
      password: '',
      passwordValidation: '',
      confirmPassword: '',
      confirmPasswordValidation: ''
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

    if (currentUsername.length < 4 && currentUsername.length !== 0) {
      this.setState({ usernameValidation: 'input-error'});
    } else {
      this.setState({ usernameValidation: 'input-success'});
    }
  }

  checkPassword(e) {
    let currentPassword = e.target.value;
    this.setState({ password: currentPassword });

    if (currentPassword.length < 6 && currentPassword.length !== 0) {
      this.setState({ passwordValidation: 'input-error'});
    } else {
      this.setState({ passwordValidation: 'input-success'});
    }

    if (currentPassword === this.state.confirmPassword) {
      this.setState({ confirmPasswordValidation: 'input-success'});
    } else {
      this.setState({ confirmPasswordValidation: 'input-error'});
    }
  }

  checkConfirmPassword(e) {
    let currentConfirmPassword = e.target.value;
    this.setState({ confirmPassword: currentConfirmPassword });

    if (currentConfirmPassword === this.state.password) {
      this.setState({ confirmPasswordValidation: 'input-success'});
    } else {
      this.setState({ confirmPasswordValidation: 'input-error'});
    }
  }

  submitForm() {
    // TODO

  }

  render() {
    return (
      <div>
        <Form>
          <h2 className="signup-header">SIGN UP</h2>
          <div className="row col-xs-12">
            <input
              id="inputsName"
              type="text"
              label="Text"
              placeholder="First Name"
              className="input-lg col-xs-10 col-xs-offset-1"/>
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsName"
              type="text"
              label="Text"
              placeholder="Last Name"
              className="input-lg col-xs-10 col-xs-offset-1"/>
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsUsername"
              type="text"
              placeholder="Create A Username"
              className={this.state.usernameValidation + ' input-lg col-xs-10 col-xs-offset-1'}
              value={this.state.username}
              onChange={this.checkUsername}/>
            <HelpBlock className={this.state.usernameValidation === 'input-error' ? 'show-error' : 'hide-error'}>Username must be at least 4 characters.</HelpBlock>
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsPassword"
              label="Password"
              type="password"
              placeholder="Create A Password"
              className={this.state.passwordValidation + ' input-lg col-xs-10 col-xs-offset-1'}
              value={this.state.password}
              onChange={this.checkPassword}
            />
            <HelpBlock className={this.state.passwordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Password must be at least 6 characters.</HelpBlock>
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsConfirmPassword"
              label="Password"
              type="password"
              placeholder="Confirm Password"
              className={this.state.confirmPasswordValidation + ' input-lg col-xs-10 col-xs-offset-1'}
              value={this.state.confirmPassword}
              onChange={this.checkConfirmPassword}
            />
            <HelpBlock className={this.state.confirmPasswordValidation === 'input-error' ? 'show-error' : 'hide-error'}>Passwords must match.</HelpBlock>
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsEmail"
              type="email"
              label="Email address"
              className="input-lg col-xs-10 col-xs-offset-1"
              placeholder="Your Email"
            />
          </div>
          <div className="row col-xs-12">
            <input
              id="inputsAccessCode"
              type="text"
              label="Text"
              className="input-lg col-xs-10 col-xs-offset-1"
              placeholder="Classroom Access Code"
            />
          </div>

          <div className="row col-xs-12">
            <select className="select input-lg col-xs-10 col-xs-offset-1" placeholder="select">
              <option><span className="signup-select-option">Select Grade Level</span></option>
              {this.state.grades.map(grade =>
                <option key={grade}>{grade}</option>
              )}
            </select>
          </div>
          <div className="row col-xs-12">
            <input type="Submit" className="signup-button btn btn-lg btn-default col-xs-10 col-xs-offset-1" onClick={this.submitForm} value="SUBMIT">
            </input>
          </div>
          <div className="row col-xs-12">
            <h5 className="signup-dialogue">Already have an account? <a className="signup-anchor" href='#'>Click here to log in!</a></h5>
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