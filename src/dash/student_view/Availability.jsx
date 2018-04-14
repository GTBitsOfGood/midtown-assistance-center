import React from 'react';
import { connect } from 'react-redux';

class AvailabilityComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table availability-table table-striped table-bordered table-sm">
          <tbody>
            <tr>
              <th scope="row">Sunday</th>
              <td>
                {this.props.availability['Sunday'].length === 0 ? 'None' : ''}
                {this.props.availability['Sunday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Monday</th>
              <td>
                {this.props.availability['Monday'].length === 0 ? 'None' : ''}
                {this.props.availability['Monday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Tuesday</th>
              <td>
                {this.props.availability['Tuesday'].length === 0 ? 'None' : ''}
                {this.props.availability['Tuesday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Wednesday</th>
              <td>
                {this.props.availability['Wednesday'].length === 0
                  ? 'None'
                  : ''}
                {this.props.availability['Wednesday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Thursday</th>
              <td>
                {this.props.availability['Thursday'].length === 0 ? 'None' : ''}
                {this.props.availability['Thursday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Friday</th>
              <td>
                {this.props.availability['Friday'].length === 0 ? 'None' : ''}
                {this.props.availability['Friday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Saturday</th>
              <td>
                {this.props.availability['Saturday'].length === 0 ? 'None' : ''}
                {this.props.availability['Saturday'].map((time, num) => {
                  return (
                    time.start_time.split(':')[0] % 12 +
                    ':' +
                    time.start_time.split(':')[1] +
                    (time.start_time.split(':')[0] >= 12 ? ' PM' : ' AM') +
                    '-' +
                    time.end_time.split(':')[0] % 12 +
                    ':' +
                    time.end_time.split(':')[1] +
                    (time.end_time.split(':')[0] >= 12 ? ' PM' : ' AM')
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentView: state.studentView
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityComp);
