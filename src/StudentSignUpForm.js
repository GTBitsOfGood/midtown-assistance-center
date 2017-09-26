import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Form, HelpBlock} from 'react-bootstrap';

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
  }

  render() {
    return (
      <div>
        <Modal.Dialog style={{marginTop: '50px'}}>

          <Modal.Header>
            <Modal.Title>Student Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <FormGroup
                controlId="formName">
                <FormControl
                  id="formControlsName"
                  type="text"
                  label="Text"
                  placeholder="Your Name"
                />
              </FormGroup>
              <FormGroup
                controlId="formUsername"
                validationState={this.state.usernameValidation}>
                <FormControl
                  id="formControlsUsername"
                  type="text"
                  label="Text"
                  placeholder="Create A Username"
                  value={this.state.username}
                  onChange={this.checkUsername}
                />
                <HelpBlock>Username must be at least 4 characters.</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="formPassword"
                validationState={this.state.passwordValidation}>
                <FormControl
                  id="formControlsPassword"
                  label="Password"
                  type="password"
                  placeholder="Create A Password"
                  value={this.state.password}
                  onChange={this.checkPassword}
                />
                <HelpBlock>Password must be at least 6 characters.</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="formConfirmPassword"
                validationState={this.state.confirmPasswordValidation}>
                <FormControl
                  id="formControlsConfirmPassword"
                  label="Password"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.checkConfirmPassword}
                />
                <HelpBlock>Passwords must match.</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="formEmail">
                <FormControl
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Your Email"
                />
              </FormGroup>
              <FormGroup
                controlId="formAccessCode">
                <FormControl
                  id="formControlsAccessCode"
                  type="text"
                  label="Text"
                  placeholder="Classroom Access Code"
                />
              </FormGroup>

              <FormGroup controlId="formControlsGradeLevel">
                <ControlLabel>Grade Level</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  {this.state.grades.map(grade =>
                    <option key={grade}>{grade}</option>
                  )}
                </FormControl>
              </FormGroup>

              <FormGroup>
                Already have an account? <a href='.\login'>Click here to log in!</a>
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" onClick={this.submitForm}>
              Submit
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
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