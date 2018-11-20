import React from 'react';
import {Table} from 'react-bootstrap';

class School extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newClassroomName: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ newClassroomName: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.newClassroomName);
        event.preventDefault();
        {this.props.addAccessCode(this.props.schoolAndAccessCodes.school_code, this.state.newClassroomName)};
    }

    render() {
        const accessCodeList = this.props.schoolAndAccessCodes.filteredCodes.map((code) => (

            <tr key={code.access_code}>
                <td>{code.access_code}</td>
                <td>{code.name}</td>
            </tr>

        ));
        //            <h3>{props.schoolAndAccessCodes.school_code}, {props.schoolAndAccessCodes.school_name}</h3>
        console.log('SCHOOL AND ACCESS CODES: ' + this.props.schoolAndAccessCodes);
        return (
            <div>
                <h3>{this.props.schoolAndAccessCodes.school_code}, {this.props.schoolAndAccessCodes.school_name}</h3>

                <Table striped bordered>
                    <tr>
                        <th>Access Code</th>
                        <th>Name</th>
                    </tr>
                    <tbody>{accessCodeList}</tbody>
                </Table>
                <div>
                    <input
                        value={this.props.accessCodeName}
                        placeholder='Classroom name. Ex: Ms.Smith 4th period literature'
                        onChange={this.handleChange}
                        size='60'
                    />
                    <button
                        type='submit'
                        className='btn btn-success'
                        onClick={this.handleSubmit}
                    >
                        Add New Classroom
                    </button>
                </div>

            </div>
        );
    };//
};

export default School;