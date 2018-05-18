import styles from '../../../public/css/admin.css';
import React from 'react';
import AddSubject from './AddSubject.jsx';

class Schools extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>SCHOOLS</h1>
                <br />
                <AddSubject />
            </div>
        );
    }
}
export default Schools;
