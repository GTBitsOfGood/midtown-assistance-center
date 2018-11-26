import React from 'react';
import { connect } from 'react-redux';
import { addSchoolAndUpdate } from '../../redux/actions/admin_actions';

class AddSchool extends React.Component {
    constructor(props) {
        super(props);
        this.handleGeneral = this.handleGeneral.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            school_name: '',
            street: '',
            zip_code: '',
            state: '',
        };
    }

    handleGeneral(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addSchoolAndUpdate(this.state);
        this.setState({
            school_name: '',
            street: '',
            zip_code: '',
            state: ''
        });
    }

    render() {
        return (
            <div className='container-fluid'>
                <h2 className='row text-center'>Add New School</h2>
                <div className="container-fluid">
                    <div className='form-group row'>
                        <input
                            type='text'
                            name='school_name'
                            placeholder='School Name'
                            className='form-control'
                            onChange={this.handleGeneral}
                        />
                    </div>
                    <div className = 'form-group row'>
                        <input
                            name='street'
                            type='text'
                            placeholder='Street Address'
                            className='form-control'
                            onChange={this.handleGeneral}
                        />
                    </div>

                    <div className = 'form-group row'>
                        <input
                            name='zip_code'
                            type='number'
                            className='form-control'
                            placeholder='Zip Code'
                            onChange={this.handleGeneral}
                        />
                    </div>
                    <div className='form-group row'>
                        <input
                            name='state'
                            type='text'
                            className='form-control'
                            placeholder='State'
                            onChange={this.handleGeneral}
                        />
                    </div>
                    <button
                        type="submit"
                        value="submit"
                        className="btn btn-success"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addSchoolAndUpdate: school => dispatch(addSchoolAndUpdate(school)),
});


export default connect(null, mapDispatchToProps)(AddSchool);