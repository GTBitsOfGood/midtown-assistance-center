import styles from '../../../public/css/admin.css';
import React from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import BanItem from './BanItem.jsx';
import { connect } from 'react-redux';
import { getBans, getBannedUsers, unbanStudentAndUpdate, unbanTutorAndUpdate } from '../../redux/actions/admin_actions';


class BanDash extends React.Component {
    componentDidMount() {
        this.props.getBans();
        this.props.getBannedUsers();
    }

    render() {
        const renTutors = this.props.bans.map(ban => (
            <BanItem key={ban._id} ban={ban} id={ban._id} />
        ));
        const bannedTutorsList = this.props.bannedTutors.map((tutor, index) => {
            return (
                <tr key={tutor._id}>
                    <td>{index + 1}</td>
                    <td>{tutor.first_name}</td>
                    <td>{tutor.last_name}</td>
                    <td>{tutor._id}</td>
                    <td>
                        <button type="button" className="btn btn-success" onClick={() => this.props.unbanTutorAndUpdate(tutor._id)}>
                            {`unban ${tutor._id}`}
                        </button>
                    </td>
                </tr>
            );
        });
        const bannedStudentsList = this.props.bannedStudents.map((student, index) => {
            return (
                <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student._id}</td>
                    <td>
                        <button type="button" className="btn btn-success" onClick={() => this.props.unbanStudentAndUpdate(student._id)}>
                            {`unban ${student._id}`}
                        </button>
                    </td>
                </tr>
            );
        });
        const bannedTutorsHtml = this.props.bannedTutors.length === 0  ? null : (
            <div>
                <h3>Banned Tutors</h3>
                <Table striped bordered>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ID</th>
                        <th>Unban</th>
                    </tr>
                    <tbody>{bannedTutorsList}</tbody>
                </Table>
            </div>
        );

        const bannedStudentsHtml = this.props.bannedStudents.length === 0 ? null : (
            <div>
                <h3>Banned Students</h3>
                <Table striped bordered>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ID</th>
                        <th>Unban</th>
                    </tr>
                    <tbody>{bannedStudentsList}</tbody>
                </Table>
            </div>
        );

        return (
            <div>
                { renTutors }
                { bannedTutorsHtml }
                { bannedStudentsHtml }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bans: state.adminView.bans,
    bannedStudents: state.adminView.bannedStudents,
    bannedTutors: state.adminView.bannedTutors
});

const mapDispatchToProps = dispatch => {
    return {
        getBans: () => dispatch(getBans()),
        getBannedUsers: () => dispatch(getBannedUsers()),
        unbanStudentAndUpdate: (student_id) => dispatch(unbanStudentAndUpdate(student_id)),
        unbanTutorAndUpdate: (tutor_id) => dispatch(unbanTutorAndUpdate(tutor_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanDash);
