import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class StudentSignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <h1> Hello {this.props.name} </h1>
        <button className="square">
          Test button
        </button>
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

ReactDOM.render(<StudentSignUpForm name='Student'/>, document.getElementById('root'));