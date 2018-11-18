import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap';
import { getAllSchoolsAndAccessCodes } from '../../redux/actions/admin_actions';
import School from './School';

class SchoolsListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schoolsAndAccessCodes: [],
        };

    }

    componentDidMount() {
        this.props.getAllSchoolsAndAccessCodes();
    }

    render() {
        if (this.props.schoolsAndAccessCodes.length > 0) {
            const fullSchoolList = this.props.schoolsAndAccessCodes.map((school, index) =>
                <div>
                    <School schoolAndAccessCodes={this.props.schoolsAndAccessCodes[index]} />
                </div>
            );
            return (
                <div>
                    {fullSchoolList}
                </div>);
        }
        else {
            return(
                <div>
                    <h2>Loading schools</h2>
                </div>
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        schoolsAndAccessCodes: state.adminView.schoolsAndAccessCodes
    };
};

const mapDispatchToProps = dispatch => ({
    getAllSchoolsAndAccessCodes: () => dispatch(getAllSchoolsAndAccessCodes()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SchoolsListContainer);