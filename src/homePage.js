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
      username: 'test',
      usernameValidation: 'error'
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.checkUsername = this.checkUsername.bind(this);

    this.state.grades = [];
    for (let i = props.startingGrade; i <= props.endingGrade; i++) {
      this.state.grades.push(i);
    }
  }

  close(e) {
    console.log(e);
    this.setState({ showModal: false });
  }

  open(e) {
    console.log(e);
    this.setState({ showModal: true });
  }

  checkUsername(e) {
    console.log(e);

    var currentUsername = event.target.value;
    this.setState({ username: currentUsername });

    if (currentUsername.length < 6) {
      this.setState({ usernameValidation: 'error'});
    } else {
      this.setState({ usernameValidation: 'success'});
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
                <HelpBlock>Username must be at least 6 characters.</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="formPassword">
                <FormControl
                  id="formControlsPassword"
                  label="Password"
                  type="password"
                  placeholder="Create A Password"
                />
              </FormGroup>
              <FormGroup
                controlId="formConfirmPassword">
                <FormControl
                  id="formControlsConfirmPassword"
                  label="Password"
                  type="password"
                  placeholder="Confirm Password"
                />
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