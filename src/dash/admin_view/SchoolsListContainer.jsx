import React from 'react';
import { connect } from 'react-redux';
import { getAllSchoolsAndAccessCodes, addAccessCode } from '../../redux/actions/admin_actions';
import School from './School';

class SchoolsListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schoolsAndAccessCodes: [],
            selected_school_code: '',
            newClassroomName: '',
        };

    }

    componentDidMount() {
        this.props.getAllSchoolsAndAccessCodes();
    }

    addAccessCode(school_code, name) {
        this.props.addAccessCode(school_code, name);
    }
    render() {
        const fullSchoolList = this.props.schoolsAndAccessCodes.map((school, index) =>
            <div>
                <School
                    schoolAndAccessCodes={this.props.schoolsAndAccessCodes[index]}
                    onClick={addAccessCode}
                />
            </div>
        );
        return (
            <div>
                {fullSchoolList}
            </div>);

    }
}


const mapStateToProps = state => {
    return {
        schoolsAndAccessCodes: state.adminView.schoolsAndAccessCodes
    };
};

const mapDispatchToProps = dispatch => ({
    getAllSchoolsAndAccessCodes: () => dispatch(getAllSchoolsAndAccessCodes()),
    addAccessCode: (school_code, name) => dispatch(addAccessCode(school_code, name)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SchoolsListContainer);