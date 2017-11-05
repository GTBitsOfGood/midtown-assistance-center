import React from 'react';
import { connect } from 'react-redux';
import { setUserAction } from '../redux/userActions.js';
import axios from 'axios';

import TimePicker from './TimePicker.jsx';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: 'Sam',
            last_name: 'Tutor',
            email: 'asdf@email.com',
            join_date: new Date(),
            bio: 'Currently this is hardcoded json. The username and password are from the user. Still need to make responsive',
            classroom: 'asdf1234',
            is_edit: false,
            button_text: 'Edit',
            schedule: [
                {date: "monday", start: "13:30", end: "15:00"},
                {date: "wednesday", start: "11:00", end: "12:00"},
                {date: "friday", start: "13:00", end: "15:00"}
            ]
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
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
        // TODO: update database with updated info
        alert("(Didn't) save updated info!");
    }

    handleEdit(event) {
        var editing = !this.state.is_edit;
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
        const scheduleItems = this.state.schedule.map((d) =>
            <div className="time-item">
                <TimePicker date={d.date} start={d.start} end={d.end}/>
                <button className="btn btn-danger btn-sm">Remove</button>
            </div>
        );

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
                                    <h1>{ this.state.first_name + " " + this.state.last_name }</h1>
                                    <small><cite title="Atlanta, USA">
                                        Atlanta, USA <i className="glyphicon glyphicon-map-marker"></i>
                                    </cite></small>
                                    <h3>{ this.props.user }</h3>
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
                                    { scheduleItems }
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(setUserAction(user))
    }
}

const TutorProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default TutorProfile;