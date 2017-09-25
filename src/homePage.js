import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Modal, Form, FormGroup, FieldGroup, ControlLabel, FormControl} from 'react-bootstrap';

class StudentSignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
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
              <FieldGroup
                id="formControlsText"
                type="text"
                label="Text"
                placeholder="Enter text"
              />
              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Enter email"
              />
              <FieldGroup
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
              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Multiple select</ControlLabel>
                <FormControl componentClass="select" multiple>
                  <option value="select">select (multiple)</option>
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