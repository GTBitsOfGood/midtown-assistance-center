import React from 'react';
import { connect } from 'react-redux';
import { getAllAccessCodes } from '../../redux/actions/accessCode_actions';

class SchoolsListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allAccessCodes: []
        };

    }

    componentDidMount() {
        this.props.getAllAccessCodes();
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
        allAccessCodes: state.allAccessCodes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllAccessCodes: () => dispatch(getAllAccessCodes())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SchoolsListContainer);