import React from 'react';
import { connect } from 'react-redux';
import {saveUser} from "../../redux/actions/user_actions";

class StudentProfile extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        is_edit: false,
        button_text: 'Edit',
        email: undefined,
        bio: undefined,
        isFirst: true
      };

      this.handleSave = this.handleSave.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleBioChange = this.handleBioChange.bind(this);
    }

    handleSave(event) {
      // TODO field validation + better checking of what changed

      let new_user = Object.assign({}, this.props);
      new_user.email = this.state.email;
      new_user.bio = this.state.bio;
      this.props.saveUser(new_user);
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

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handleBioChange(event) {
      this.setState({bio: event.target.value});
    }

    render() {
        if (this.state.isFirst) {
          // FIXME don't call setState here, we don't need the component to re-render!!
          this.state.email = this.props.email;
          this.state.bio = this.props.bio;
          this.state.isFirst = false;
        }

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
                                                    disabled={ !this.state.is_edit }
                                                    onChange={ this.handleEmailChange }
                                                    defaultValue={this.props.email}/>
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
                                                <p>{ this.props.join_date }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-home"></i> Bio:
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    disabled={ !this.state.is_edit }
                                                    onChange={ this.handleBioChange }
                                                    defaultValue={this.props.bio}/>
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
        saveUser : (user) => dispatch(saveUser(user))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentProfile);