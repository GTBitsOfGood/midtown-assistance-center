import React from 'react';
import {Table} from 'react-bootstrap';

const School = function School(props) {
    const accessCodeList = props.schoolAndAccessCodes.filteredCodes.map((code) => (

        <tr key={code.access_code}>
            <td>{code.access_code}</td>
            <td>{code.name}</td>
        </tr>

    ));
    //            <h3>{props.schoolAndAccessCodes.school_code}, {props.schoolAndAccessCodes.school_name}</h3>
    console.log('SCHOOL AND ACCESS CODES: ' + props.schoolAndAccessCodes);
    return(
        <div>
            <h3>{props.schoolAndAccessCodes.school_code}, {props.schoolAndAccessCodes.school_name}</h3>

            <Table striped bordered>
                <tr>
                    <th>Classroom Code</th>
                    <th>Name</th>
                </tr>
                <tbody>{accessCodeList}</tbody>
            </Table>

        </div>
    );
};

export default School;