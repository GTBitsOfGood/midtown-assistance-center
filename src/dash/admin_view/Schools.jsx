import styles from '../../../public/css/admin.css';
import React from 'react';
import AddSubject from './AddSubject.jsx';
import SchoolsListContainer from './SchoolsListContainer.jsx';

class Schools extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>SCHOOLS</h1>
                <br />
                <SchoolsListContainer/>
                <AddSubject />
            </div>
        );
    }
}
export default Schools;
