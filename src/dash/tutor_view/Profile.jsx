import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {saveTutor} from "../../redux/actions/user_actions";

import TimePicker from './TimePicker.jsx';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.user.bio,
            email: this.props.user.email,
            is_edit: false,
            button_text: 'Edit',
            availability: this.props.user.availability
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleRemoveSchedule = this.handleRemoveSchedule.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
      // TODO field validation + better checking of what changed

      let new_user = Object.assign({}, this.props);
      new_user.email = this.state.email;
      new_user.bio = this.state.bio;
      new_user.availability = this.state.availability;
      this.props.saveUser(new_user);
    }

    handleEdit() {
        let editing = !this.state.is_edit;
        this.setState({is_edit: editing});

        if (editing) {
            this.setState({button_text: 'Save'});
        } else {
            this.setState({button_text: 'Edit'});
            this.handleSave();
        }
    }

    handleAddSchedule() {
        // TODO
        // if (this.state.is_edit) {
        //     let temp = this.state.availability;
        //     temp.append({date: "monday", start: "00:00", end: "00:00"});
        //     this.setState({availability: temp});
        // }
    }

    handleRemoveSchedule(event) {
        // TODO
        console.log(event);
        // this.setState({people: this.state.people.filter(function(person) {
        //     return person !== e.target.value
        // })};
    }

    handleBioChange(event) {
        this.setState({bio: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    render() {
        const availabilityItems = Object.keys(this.state.availability).map((d, index) =>
            <div className="time-item">
                <TimePicker key={index} date={d.date} start={d.start} end={d.end} is_edit={ this.state.is_edit }/>
                <button value={index} className="btn btn-danger btn-sm" onClick={ this.handleRemoveSchedule }>Remove</button>
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
                                    <h1>{ this.props.user.first_name + " " + this.props.user.last_name }</h1>
                                    <small><cite title="Atlanta, USA">
                                        Atlanta, USA <i className="glyphicon glyphicon-map-marker"></i>
                                    </cite></small>
                                    <h3>{ this.props.user._id }</h3>
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
                                                <i className="glyphicon glyphicon-calendar"></i>Join Date:
                                                <p>{ this.props.user.join_date }</p>
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
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <i className="glyphicon glyphicon-time"></i> Schedule:
                                            { availabilityItems }
                                            <button className="btn btn-success" onClick={ this.handleAddSchedule }>
                                                Add Schedule
                                            </button>
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
    return {
      user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      saveUser : (user) => dispatch(saveTutor(user))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);