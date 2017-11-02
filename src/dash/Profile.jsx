import React from 'react';
import { connect } from 'react-redux';
import { setUserAction } from '../redux/userActions.js';
import axios from 'axios';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: 'Sammy',
            last_name: 'Baek',
            email: 'asdf@email.com',
            join_date: new Date(),
            bio: 'Currently this is hardcoded json. The username and password are from the user. Still need to make responsive',
            classroom: 'asdf1234',
            grade_level: 9,
            is_edit: false,
            button_text: 'Edit',
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount() {
        const self = this;
        axios.get('/user')
            .then(function (response) {
                if (response.data !== '') {
                    console.log("MOUNT:", response.data);
                    self.props.setUser(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSave() {
        // TODO: update database with updated info
        alert("(Didn't) save updated info!");
    }

    handleEdit(event) {
        let editing = !this.state.is_edit;
        this.setState({is_edit: editing});

        if (editing) {
            this.setState({button_text: 'Save'});
        } else {
            this.setState({button_text: 'Edit'});
            this.handleSave();
        }
    }

    handleBioChange(event) {
        this.setState({bio: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
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
                                    <h1>{ this.props.user }</h1>
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
                                                    value={ this.state.email }
                                                    onChange={ this.handleEmailChange }
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
                                                <p>{ this.state.grade_level }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-apple"></i>Classroom:
                                                <p>{ this.state.classroom }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-calendar"></i>Join Date:
                                                <p>{ this.state.join_date.toDateString() }</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-home"></i> Bio:
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={ this.state.bio }
                                                    onChange={ this.handleBioChange }
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
    console.log(state);
    return {
        user : state.user.username,
        password: state.user.password
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(setUserAction(user))
    }
};

const DefaultProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default DefaultProfile;