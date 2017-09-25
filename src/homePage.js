/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Form, HelpBlock} from 'react-bootstrap';

export class StudentSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      username: '',
      usernameValidation: 'error',
      password: '',
      passwordValidation: 'error',
      confirmPassword: '',
      confirmPasswordValidation: 'success'
    };

    // Bindings
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirmPassword = this.checkConfirmPassword.bind(this);

    // Other logic
    this.state.grades = [];
    for (let i = props.startingGrade; i <= props.endingGrade; i++) {
      this.state.grades.push(i);
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
    let currentPassword = e.target.value;
    let previousPassword = this.state.password;
    this.setState({ confirmPassword: currentPassword });

    if (currentPassword === previousPassword) {
      this.setState({ passwordValidation: 'success'});
    } else {
      this.setState({ passwordValidation: 'error'});
    }
  }

  render() {
    return (
      <div>
        <h1>Hello {this.props.name}!</h1>

        <Button bsStyle="info" onClick={this.open}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>

          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
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
            <Button type="submit">
              Submit
            </Button>
            <Button onClick={this.close}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
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

ReactDOM.render(<StudentSignUpForm name='Teju'/>, document.getElementById('root'));