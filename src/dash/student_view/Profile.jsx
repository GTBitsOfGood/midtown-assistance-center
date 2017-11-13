import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            button_text: 'Edit',
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleSave() {
        // TODO: update database (and redux) with updated info
        alert("(Didn't) save updated info!");
    }

    handleEdit(event) {
        // FIXME try to combine set state calls

        let editing = !this.state.is_edit;
        this.setState({is_edit: editing});

        if (editing) {
            this.setState({button_text: 'Save'});
        } else {
            this.setState({button_text: 'Edit'});
            this.handleSave();
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src="../../images/default_user_img.png" alt="" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h1>{ this.props._id }</h1>
                                    <small><cite title="Atlanta, USA">
                                        Atlanta, USA <i className="glyphicon glyphicon-map-marker"></i>
                                    </cite></small>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-envelope"></i> Email:
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={ this.props.email }
                                                    disabled={ !this.state.is_edit }/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-lock"></i>Password:
                                                <p>{ this.props.password }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-globe"></i>Grade Level:
                                                <p>{ this.props.grade_level }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-apple"></i>Classroom:
                                                <p>{ this.props.classroom }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-calendar"></i>Join Date:
                                                <p>{ this.props.join_date.toDateString() }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-home"></i> Bio:
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={ this.probs.user.bio }
                                                    disabled={ !this.state.is_edit }/>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        style={{float: "right", margin: "5px"}}
                                        onClick={ this.handleEdit }>{ this.state.button_text }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return state.user;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    }
};

const DefaultProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default DefaultProfile;