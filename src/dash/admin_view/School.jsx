import React from 'react';
import {Table} from 'react-bootstrap';

class School extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const accessCodeList = this.props.schoolAndAccessCodes.filteredCodes.map((code) => (

            <tr key={code.access_code}>
                <td>{code.access_code}</td>
                <td>{code.name}</td>
            </tr>

        ));

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


            </div>
        );
    };
};

export default School;