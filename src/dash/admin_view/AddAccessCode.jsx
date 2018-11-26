import React from 'react';
import { connect } from 'react-redux';
import { addAccessCodeAndUpdate } from '../../redux/actions/admin_actions';


class AddAccessCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school_code:'',
            newClassroomName:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addAccessCode(this.state.school_code, this.state.newClassroomName);
        this.setState({ school_code: '', newClassroomName: '' });
    }

    render() {
        const schoolsList = this.props.filteredCodes.map((school) =>
            <option value = {school.school_code}>{school.school_code}, {school.school_name}</option>
        );
        return(
            <div className='container-fluid'>
                <h2 className='row text-center'>Add A New Classroom Code</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pick School:
                        <select name='school_code'
                            value={this.state.school}
                            onChange={this.handleChange}>
                            {schoolsList}
                        </select>
                    </label>
                </form>
                <div className='container-fluid'>
                    <input
                        type='text'
                        name='newClassroomName'
                        className='form-control'
                        onChange={this.handleChange}
                        placeholder='Ex: Ms.Smiths 2nd period Bio'/>
                    <button
                        type='submit'
                        className='btn btn-success'
                        onClick={this.handleSubmit}
                    >
                        Add New Access Code
                    </button>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addAccessCode: (school_code, name) => dispatch(addAccessCodeAndUpdate(school_code, name)),
});


export default connect(null, mapDispatchToProps)(AddAccessCode);