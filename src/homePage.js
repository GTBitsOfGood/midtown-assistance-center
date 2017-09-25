/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';

export class StudentSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

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
              <FormControl
                id="formControlsName"
                type="text"
                label="Text"
                placeholder="Your Name"
              />
              <FormControl
                id="formControlsUsername"
                type="text"
                label="Text"
                placeholder="Create A Username"
              />
              <FormControl
                id="formControlsPassword"
                label="Password"
                type="password"
                placeholder="Create A Password"
              />
              <FormControl
                id="formControlsConfirmPassword"
                label="Password"
                type="password"
                placeholder="Confirm Password"
              />
              <FormControl
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Your Email"
              />
              <FormControl
                id="formControlsAccessCode"
                type="text"
                label="Text"
                placeholder="Classroom Access Code"
              />

              <FormGroup controlId="formControlsGradeLevel">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  {this.state.grades.map(grade =>
                    <option key={grade}>{grade}</option>
                  )}
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Static text</ControlLabel>
                <FormControl.Static>
                  email@example.com
                </FormControl.Static>
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