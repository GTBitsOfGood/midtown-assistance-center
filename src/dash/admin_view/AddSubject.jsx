import styles from '../../../public/css/admin.css';
import React from 'react';
import { connect } from 'react-redux';

import { getSubjects } from '../../redux/actions/subject_actions';
import * as types from '../../redux/actions/types/admin_types';

class AddSubject extends React.Component {
    constructor(props) {
        super(props);
        this.handleGeneral = this.handleGeneral.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            subject: ''
        };
    }

    handleGeneral(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addSubject(this.state.subject);
        this.setState({ subject: '' });
    }

    render() {
        const error =
            this.props.admin.error &&
            this.props.admin.errorType === types.addSubjectRejected ? (
                <div className="alert alert-danger">
                    <strong>Failed!</strong> {this.props.admin.error}
                </div>
            ) : (
                ''
            );
        return (
            <div className="container-fluid">
                <div className="row text-center">
                    <h1>Add a new Subject!</h1>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        {error}
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">
                                    Subject
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={this.state.subject}
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

const mapStateToProps = state => {
    return {
        admin: state.adminView
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addSubject: () => dispatch(getSubjects())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);
