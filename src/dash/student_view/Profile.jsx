import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveStudent } from '../../redux/actions/user_actions';

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            button_text: 'Edit',
            email: props.user.email,
            bio: props.user.bio
            // isFirst: true
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleSave() {
        const { user, saveUser } = this.props;
        const { email, bio } = this.state;
        // TODO field validation + better checking of what changed
        saveUser({ ...user, email, bio });
    }

    // eslint-disable-next-line no-unused-vars
    handleEdit(event) {
        // FIXME try to combine set state calls
        const { is_edit } = this.state;

        if (!is_edit) {
            this.setState({ button_text: 'Save' });
        } else {
            this.setState({ button_text: 'Edit' });
            this.handleSave();
        }
        this.setState(prevState => ({ is_edit: !prevState.is_edit }));
    }

    handleFieldChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { user } = this.props;
        const { is_edit, button_text } = this.state;
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img
                                        src="../../images/default_user_img.png"
                                        alt=""
                                        className="img-rounded img-responsive"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h1>{user._id}</h1>
                                    <small>
                                        <cite title="Atlanta, USA">
                                            Atlanta, USA{' '}
                                            <i className="glyphicon glyphicon-map-marker" />
                                        </cite>
                                    </small>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-envelope" />{' '}
                                                Email:
                                                <textarea
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    disabled={!is_edit}
                                                    onChange={this.handleFieldChange}
                                                    defaultValue={user.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-lock" />Password:
                                                <p>
                                                    {user.password}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-globe" />Grade
                                                Level:
                                                <p>
                                                    {user.grade_level}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-apple" />Classroom:
                                                <p>
                                                    {user.classroom}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-calendar" />Join
                                                Date:
                                                <p>
                                                    {user.join_date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-home" />{' '}
                                                Bio:
                                                <textarea
                                                    type="text"
                                                    name="bio"
                                                    className="form-control"
                                                    disabled={!is_edit}
                                                    onChange={this.handleFieldChange}
                                                    defaultValue={user.bio}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        style={{
                                            float: 'right',
                                            margin: '5px'
                                        }}
                                        onClick={this.handleEdit}
                                    >
                                        {button_text}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentProfile.propTypes = {
    user: PropTypes.object.isRequired,
    saveUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    saveUser: user => dispatch(saveStudent(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentProfile);
