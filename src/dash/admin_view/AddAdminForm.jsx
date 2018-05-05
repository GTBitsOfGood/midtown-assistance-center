import styles from '../../../public/css/admin.css';
import React from 'react';

const initialState = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    school: '',
    classroom: ''
};

class AddAdminForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleGeneral = this.handleGeneral.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = Object.assign({}, initialState);
    }

    handleGeneral(e) {
        let value = e.target.value;
        this.setState({ [e.target.name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const newAdmin = Object.assign({}, this.state, { isSuperAdmin: false });
        console.log(newAdmin);

        this.setState(initialState);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row text-center">
                    <h1>Add an Admin</h1>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    ID
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    First Name
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={this.state.first_name}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    Last Name
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    Email
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    School
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="school"
                                        value={this.state.school}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    Classroom
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="classroom"
                                        value={this.state.classroom}
                                        onChange={this.handleGeneral}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                value="submit"
                                className="btn btn-success"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddAdminForm;
