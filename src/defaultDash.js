import React from 'react';
import DashSearchBar from './dashSearchBar';
import TutorSearchResult from './tutorSearchResult';

class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DashSearchBar/>
        )
    }
}

export default DefaultDash;