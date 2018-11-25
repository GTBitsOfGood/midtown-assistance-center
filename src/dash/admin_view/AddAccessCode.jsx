import React from 'react';
import School from './School';

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
        {this.props.addAccessCode(this.state.school_code, this.state.newClassroomName)};

    }

    render() {
        const schoolsList = this.props.filteredCodes.map((school) =>
            <option value = {school.school_code}>{school.school_code}, {school.school_name}</option>
        );
        return(
            <div>
                <h2>Add A New Classroom Code</h2>
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
                <input
                    type='text'
                    name='newClassroomName'
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
        );
    }
}
export default AddAccessCode;