import React from 'react';
import { connect } from 'react-redux';

import {saveTutor} from '../../redux/actions/user_actions';

import TimePicker from './TimePicker.jsx';

import SubjectPicker from './SubjectPicker.jsx';

import FavoritePicker from './FavoritePicker.jsx';

import { getSubjects } from "../../redux/actions/subject_actions"

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class Profile extends React.Component {

    componentWillMount() {
        this.props.getSubjects();
    }

    constructor(props) {
        super(props);
        this.initAvailabilityList = this.initAvailabilityList.bind(this);
        let list = this.initAvailabilityList(this.props.user.availability);

        this.state = {
            bio: this.props.user.bio,
            email: this.props.user.email,
            gmail: this.props.user.gmail,
            is_edit: false,
            button_text: 'Edit',
            availability: this.props.user.availability,
            availabilityList: list,
            subjects: this.props.user.subjects,
            favorites: this.props.user.favorites,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGmailChange = this.handleGmailChange.bind(this);
        this.handleEditStart = this.handleEditStart.bind(this);
        this.handleEditEnd = this.handleEditEnd.bind(this);
        this.handleEditDate = this.handleEditDate.bind(this);
        this.handleEditStartGrade = this.handleEditStartGrade.bind(this);
        this.handleEditEndGrade = this.handleEditEndGrade.bind(this);
        this.handleEditSubject = this.handleEditSubject.bind(this);
        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.handleRemoveSubject = this.handleRemoveSubject.bind(this);
        this.handleRemoveSchedule = this.handleRemoveSchedule.bind(this);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
        this.handleEditFavorite = this.handleEditFavorite.bind(this);
        this.handleRemoveFavorite = this.handleRemoveFavorite.bind(this);
        this.handleEditFavSubject = this.handleEditFavSubject.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.unflatten = this.unflatten.bind(this);
    }

    initAvailabilityList(availability) {
        let availabilityItems = [];
        Object.keys(availability).map((date, index) => {
            let item = availability[date];
            for (event in availability[date]) {
                availabilityItems.push(
                    {
                        date: date,
                        start: availability[date][event]["start_time"],
                        end: availability[date][event]["end_time"]
                    }
                );
            }
        });
        availabilityItems.sort(function(a, b) {
            if (a.date === b.date) {
                return a.start.localeCompare(b.start);
            }
            return DAYS_OF_WEEK.indexOf(a.date) - DAYS_OF_WEEK.indexOf(b.date);
        });
        return availabilityItems;
    }

    unflatten() {
        let temp = {
            "Sunday": [],
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": []
        };
        for (let ind in this.state.availabilityList) {
            let item = this.state.availabilityList[ind];
            temp[item.date].push({
                "start_time": item.start,
                "end_time": item.end
            });
        }
        return temp;
    }

    handleSave() {
        // TODO field validation + better checking of what changed
        let new_user = Object.assign({}, this.props.user);
        new_user.email = this.state.email;
        new_user.gmail = this.state.gmail;
        new_user.bio = this.state.bio;
        new_user.subjects = this.state.subjects;
        new_user.favorites = this.state.favorites;
        new_user.availability = this.unflatten();
        this.setState({availabilityList: this.initAvailabilityList(new_user.availability)});
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

    handleEditStart(index, start) {
        let temp = this.state.availabilityList;
        temp[index].start = start;
        this.setState({availabilityList: temp});
    }

    handleEditStartGrade(index, start) {
        let temp = this.state.subjects;
        temp[index].start_grade = start.type === 'number' ? parseInt(start) : start;
        this.setState({subjects: temp});
    }

    handleEditEnd(index, end) {
        let temp = this.state.availabilityList;
        temp[index].end = end;
        this.setState({availabilityList: temp});
    }

    handleEditEndGrade(index, end) {
        console.log(end, this.state.subjects);
        let temp = this.state.subjects;
        temp[index].end_grade = end.type === 'number' ? parseInt(end) : end;
        this.setState({subjects: temp});
    }

    handleEditDate(index, date) {
        let temp = this.state.availabilityList;
        temp[index].date = date;
        this.setState({availabilityList: temp});
    }

    handleEditSubject(index, subject) {
        let temp = this.state.subjects;
        temp[index].subject = subject;
        this.setState({subjects: temp});
    }

    handleAddSchedule() {
        // default new schedule is Monday
        if (this.state.is_edit) {
            let temp = this.state.availabilityList;
            temp.push({
                date: "Monday",
                start: "00:00",
                end: "00:00"
            });
            this.setState({availability: temp});
        }
    }

    handleEditFavorite(index, fav) {
        let temp = this.state.favorites;
        temp[index].favorite = fav;
        this.setState({favorites: temp});
    }

    handleEditFavSubject(index, subj) {
        let temp = this.state.favorites;
        temp[index].subject = subj;
        this.setState({favorites: temp});
    }


    handleAddFavorite() {
        if (this.state.is_edit) {
            let temp = this.state.favorites;
            temp.push({
                favorite: "",
                // hardcoded subject, not from db
                subject: this.props.subjects.availableSubjects.data[0]
            });
            this.setState({favorites: temp});
        }
    }



    handleAddSubject() {
        if (this.state.is_edit) {
            let temp = this.state.subjects;
            temp.push({
                // hardcoded subject, not from db
                subject: this.props.subjects.availableSubjects.data[0],
                start_grade: 6,
                end_grade: 12
            });
            this.setState({subjects: temp});
        }
    }

    handleRemoveSchedule(index) {
        let temp = this.state.availabilityList;
        temp.splice(index, 1);
        this.setState({availabilityList: temp});
    }

    handleRemoveSubject(index) {
        let temp = this.state.subjects;
        temp.splice(index, 1);
        this.setState({subjects: temp});
    }

    handleRemoveFavorite(index) {
        let temp = this.state.favorites;
        temp.splice(index, 1);
        this.setState({favorites: temp});
    }


    handleBioChange(event) {
        this.setState({bio: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleGmailChange(event) {
        this.setState({gmail: event.target.value});
    }

    render() {
        let availabilityItems = [];
        let subjectItems = [];
        let favoriteItems = [];
        for (let event in this.state.availabilityList) {
            availabilityItems.push(
                <div className="time-item">
                    <TimePicker
                        index={event}
                        date={ this.state.availabilityList[event].date }
                        start={ this.state.availabilityList[event].start }
                        end={ this.state.availabilityList[event].end }
                        is_edit={ this.state.is_edit }
                        handleRemoveSchedule = {this.handleRemoveSchedule}
                        handleEditStart = {this.handleEditStart}
                        handleEditEnd = {this.handleEditEnd}
                        handleEditDate = {this.handleEditDate}/>
                </div>
            );
        }
        for (let event in this.state.subjects) {
                subjectItems.push(
                    <div className="time-item">
                        <SubjectPicker
                            index={event}
                            subject={ this.state.subjects[event].subject }
                            start={ this.state.subjects[event].start_grade }
                            end={ this.state.subjects[event].end_grade }
                            is_edit={ this.state.is_edit }
                            handleRemoveSubject = {this.handleRemoveSubject}
                            handleEditStart = {this.handleEditStartGrade}
                            handleEditEnd = {this.handleEditEndGrade}
                            handleEditSubject = {this.handleEditSubject}/>
                    </div>
                );
            }
        for (let event in this.state.favorites) {
            favoriteItems.push(
                <div className="time-item">
                    <FavoritePicker
                        index={event}
                        subject={ this.state.favorites[event].subject }
                        favorite={ this.state.favorites[event].favorite }
                        is_edit={ this.state.is_edit }
                        handleRemoveFavorite = {this.handleRemoveFavorite}
                        handleEditSubject = {this.handleEditFavSubject}
                        handleEditFavorite = {this.handleEditFavorite}/>
                </div>
            );
        }



        return (
            <div className="row tutor-dash animated fadeInLeft">
                <div className="col">
                    <div className="text-center row">
                        <h4 className="lighter-text text-uppercase tutor-events-header">  Profile</h4>
                    </div>
                    <div className="row profile-wrapper">
                        <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src="../../images/default_user_img.png" alt="user-pic" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h1>{ this.props.user.first_name + ' ' + this.props.user.last_name }</h1>
                                    <small><cite title="Atlanta, USA">
                                        Atlanta, USA <i className="glyphicon glyphicon-map-marker"></i>
                                    </cite></small>
                                    <h3>{ this.props.user._id }</h3>
                                    </div>
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-envelope"></i>Email:
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
                                                <i className="glyphicon glyphicon-envelope"></i>Gmail:
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={ this.state.gmail }
                                                    onChange={ this.handleGmailChange }
                                                    disabled={ !this.state.is_edit }/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <i className="glyphicon glyphicon-calendar"></i>Join Date:
                                                <p>{ (new Date(this.props.user.join_date)).toDateString() }</p>
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
                                            <i className="glyphicon glyphicon-apple"></i> Subjects:
                                            { subjectItems }
                                            <button
                                                className="btn btn-success add-subject"
                                                onClick={ this.handleAddSubject }
                                                disabled={ !this.state.is_edit }>
                                                Add a Subject
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <i className="glyphicon glyphicon-apple"></i> Favorites:
                                            { favoriteItems }
                                            <button
                                                className="btn btn-success add-subject"
                                                onClick={ this.handleAddFavorite }
                                                disabled={ !this.state.is_edit }>
                                                Add a Favorite
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <i className="glyphicon glyphicon-time"></i> Schedule:
                                            { availabilityItems }
                                            <button
                                                className="btn btn-success add-time"
                                                onClick={ this.handleAddSchedule }
                                                disabled={ !this.state.is_edit }>
                                                Add a time
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        style={{float: 'right', margin: '5px'}}
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
        subjects: state.subjects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser : (user) => dispatch(saveTutor(user)),
        getSubjects: () => dispatch(getSubjects)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
