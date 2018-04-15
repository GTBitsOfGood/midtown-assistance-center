import React from 'react';
import { connect } from 'react-redux';
import { saveStudent } from '../../redux/actions/user_actions';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_edit: false,
      button_text: 'Edit',
      email: this.props.user.email,
      bio: this.props.user.bio
      // isFirst: true
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
  }

  handleSave() {
    // TODO field validation + better checking of what changed
    let new_user = Object.assign({}, this.props.user);
    new_user.email = this.state.email;
    new_user.bio = this.state.bio;
    this.props.saveUser(new_user);
  }

  handleEdit(event) {
    // FIXME try to combine set state calls

    let editing = !this.state.is_edit;
    this.setState({ is_edit: editing });

    if (editing) {
      this.setState({ button_text: 'Save' });
    } else {
      this.setState({ button_text: 'Edit' });
      this.handleSave();
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleBioChange(event) {
    this.setState({ bio: event.target.value });
  }

  render() {
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
                  <h1>{this.props.user._id}</h1>
                  <small>
                    <cite title="Atlanta, USA">
                      Atlanta, USA{' '}
                      <i className="glyphicon glyphicon-map-marker" />
                    </cite>
                  </small>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-envelope" /> Email:
                        <textarea
                          type="text"
                          className="form-control"
                          disabled={!this.state.is_edit}
                          onChange={this.handleEmailChange}
                          defaultValue={this.props.user.email}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-lock" />Password:
                        <p>{this.props.user.password}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-globe" />Grade Level:
                        <p>{this.props.user.grade_level}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-apple" />Classroom:
                        <p>{this.props.user.classroom}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-calendar" />Join Date:
                        <p>{this.props.user.join_date}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <i className="glyphicon glyphicon-home" /> Bio:
                        <textarea
                          type="text"
                          className="form-control"
                          disabled={!this.state.is_edit}
                          onChange={this.handleBioChange}
                          defaultValue={this.props.user.bio}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ float: 'right', margin: '5px' }}
                    onClick={this.handleEdit}
                  >
                    {this.state.button_text}
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUser: user => dispatch(saveStudent(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
