import styles from '../../../public/css/admin.css';
import React from 'react';
import AddSubject from './AddSubject.jsx';
import SchoolsListContainer from './SchoolsListContainer.jsx';
import AddSchool from './AddSchool';

class Schools extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>SCHOOLS</h1>
                <br />
                <SchoolsListContainer />
                <AddSchool/>
                <AddSubject />
            </div>
        );
    }
}
export default Schools;
