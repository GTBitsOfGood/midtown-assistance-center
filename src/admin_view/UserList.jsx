import React from 'react';
import styles from '../../public/css/admin.css';
import { Table, Tabs, Tab } from 'react-bootstrap';

class UserList extends React.Component {
  constructor(props, context) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    //alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Students">
            Show Students
          </Tab>
          <Tab eventKey={2} title="Tutors">
            Show Tutors
          </Tab>
        </Tabs>

        <Table striped bordered>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Tutored Subjects</th>
          </tr>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Otto</td>
              <td>Biology, Chemistry</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob Thornton</td>
              <td>Language Arts</td>
            </tr>
            <tr>
              <td>3</td>
              <td>John Doe </td>
              <td>Pre-Calculus</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UserList;
