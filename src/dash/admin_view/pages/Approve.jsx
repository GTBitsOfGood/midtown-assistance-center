import styles from '../../../../public/css/admin.css';
import React from 'react';
import ApproveTutorItem from '../ApproveTutorItem.jsx';
import axios from 'axios';

class Approve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tutors: []
        };
        this.initUnapprovedTutors = this.initUnapprovedTutors.bind(this);
    }

    componentWillMount() {
        this.initUnapprovedTutors();
    }

    initUnapprovedTutors() {
        let self = this;
        axios
            .get('/api/unapprovedTutors')
            .then(function(response) {
                self.setState({ tutors: response.data.tutors });
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    render() {
        const renTutors = this.state.tutors.map((obj, num) => {
            return obj.confirmed ? (
                <ApproveTutorItem
                    refreshTutors={this.initUnapprovedTutors}
                    tutor={obj}
                    id={num}
                />
            ) : (
                ''
            );
        });
        return <div>{renTutors}</div>;
    }
}
export default Approve;
