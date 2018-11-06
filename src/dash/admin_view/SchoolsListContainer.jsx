import React from 'react';
import { connect } from 'react-redux';
import { getAllAccessCodes } from '../../redux/actions/accessCode_actions';
import { getAllSchoolCodes  } from '../../redux/actions/school_actions';

class SchoolsListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allAccessCodes: [],
            allSchoolCodes: [],
        };

    }

    componentDidMount() {
        this.props.getAllAccessCodes();
        this.props.getAllSchoolCodes();
    }

    render() {
        return (
            <div>
                <h1>test</h1>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        allAccessCodes: state.allAccessCodes,
        allSchoolCodes: state.allSchoolCodes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllAccessCodes: () => dispatch(getAllAccessCodes()),
        getAllSchoolCodes: () => dispatch(getAllSchoolCodes())

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SchoolsListContainer);