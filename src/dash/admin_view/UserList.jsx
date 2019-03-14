import React from 'react';
import styles from '../../../public/css/admin.css';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { getAllTutors } from '../../redux/actions/admin_actions';
import { connect } from 'react-redux';

class UserList extends React.Component {
    constructor(props, context) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }

    componentDidMount() {
        this.props.getTutors();
    }

    handleSelect(key) {
        //alert(`selected ${key}`);
        this.setState({ key });
    }

    render() {
        const tutors = this.props.tutors.map((tutor, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tutor.first_name}</td>
                    <td>{tutor.last_name}</td>
                    <td>
                        {tutor.subjects.map(subj => subj.subject).join(', ')}
                    </td>
                </tr>
            );
        });
        return (
            <div>
                {/* <Tabs
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
                </Tabs> */}
                <h3>All Tutors</h3>
                <Table striped bordered>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Tutored Subjects</th>
                    </tr>
                    <tbody>{tutors}</tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tutors: state.adminView.allTutors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTutors: () => dispatch(getAllTutors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
