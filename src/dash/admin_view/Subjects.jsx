import styles from '../../../public/css/admin.css';
import React from 'react';
import AddSubject from './AddSubject.jsx';

class Subjects extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <AddSubject />
            </div>
        );
    }
}
export default Subjects;
