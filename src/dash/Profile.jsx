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
            // _id: {type: String, required: true},
            password: 'asdfqwer',
            join_date: Date.now(),
            bio: 'Currently this is hardcoded json. The username and password are from redux',
            // profile_picture: ,
            classroom: 'asdf1234',
            grade_level: 9,
            is_edit: false,
            button_text: 'Edit'
        }
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        var self = this;
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

    }

    handleEdit(event) {
        var editing = !this.state.is_edit;
        this.setState({is_edit: editing});

        if (editing) {
            this.handleSave();

            this.setState({button_text: 'Save'});
        } else {
            this.setState({button_text: 'Edit'});
        }


    }


    render() {
        {this.props.user}
        return (
            //https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
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
                                    <small><cite title="Atlanta, USA">Atlanta, USA <i className="glyphicon glyphicon-map-marker">
                                    </i></cite></small>
                                    <h4>
                                        <i className="glyphicon glyphicon-envelope"></i><span> { this.state.email }</span>
                                        <br />
                                        <i className="glyphicon glyphicon-lock"></i><span> { this.props.password }</span>
                                        <br/>
                                        <i className="glyphicon glyphicon-calendar"></i><span> { this.state.join_date }</span>
                                        <br/>
                                        <i className="glyphicon glyphicon-apple"></i><span> { this.state.classroom }</span>
                                        <br/>
                                        <i className="glyphicon glyphicon-home"></i><span contentEditable={this.state.is_edit}> { this.state.bio }</span>
                                    </h4>
                                    <button
                                        className="btn btn-primary"
                                        style={{float: "right"}}
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(setUserAction(user))
    }
}

const DefaultProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default DefaultProfile;