/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';

export class StudentSignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
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
                id="formControlsText"
                type="text"
                label="Text"
                placeholder="Enter text"
              />
              <FormControl
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Enter email"
              />
              <FormControl
                id="formControlsPassword"
                label="Password"
                type="password"
              />

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Static text</ControlLabel>
                <FormControl.Static>
                  email@example.com
                </FormControl.Static>
              </FormGroup>

              <Button type="submit">
                Submit
              </Button>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

StudentSignUpForm.propTypes = {
  name: PropTypes.string
};

StudentSignUpForm.defaultProps = {
  name: 'Stranger'
};

ReactDOM.render(<StudentSignUpForm name='Teju'/>, document.getElementById('root'));