import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveTutor } from '../../redux/actions/user_actions';

import TimePicker from './TimePicker';

import SubjectPicker from './SubjectPicker';

import FavoritePicker from './FavoritePicker';

const DEFAULT_SUBJ = 'math';

const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const initAvailabilityList = availability => {
    const availabilityItems = [];
    Object.keys(availability).forEach(date => {
        availability[date].forEach((event, index) => {
            availabilityItems.push({
                date,
                start: availability[date][index].start_time,
                end: availability[date][index].end_time
            });
        });
    });
    availabilityItems.sort((a, b) => {
        if (a.date === b.date) {
            return a.start.localeCompare(b.start);
        }
        return DAYS_OF_WEEK.indexOf(a.date) - DAYS_OF_WEEK.indexOf(b.date);
    });
    return availabilityItems;
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = props;
        const list = initAvailabilityList(user.availability);

        this.state = {
            bio: user.bio,
            email: user.email,
            gmail: user.gmail,
            is_edit: false,
            button_text: 'Edit',
            availabilityList: list,
            subjects: user.subjects,
            favorites: user.favorites,
            editProfilePic: 'hide',
            profile_picture: user.profile_picture
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGmailChange = this.handleGmailChange.bind(this);
        this.handleProfilePicChange = this.handleProfilePicChange.bind(this);
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
        this.handleSaveProfilePic = this.handleSaveProfilePic.bind(this);
        this.handleEditProfilePic = this.handleEditProfilePic.bind(this);
    }

    unflatten() {
        const { availabilityList } = this.state;
        const temp = {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        };
        availabilityList.forEach(availability => {
            const item = availability;
            temp[item.date].push({
                start_time: item.start,
                end_time: item.end
            });
        });
        return temp;
    }

    handleSave() {
        const { user, saveUser } = this.props;
        const { email, gmail, bio, subjects, favorites } = this.state;
        // TODO field validation + better checking of what changed
        const new_user = Object.assign({}, user);
        new_user.email = email;
        new_user.gmail = gmail;
        new_user.bio = bio;
        new_user.subjects = subjects;
        new_user.favorites = favorites;
        new_user.availability = this.unflatten();
        this.setState({
            availabilityList: initAvailabilityList(new_user.availability)
        });
        saveUser(new_user);
    }

    handleSaveProfilePic() {
        const { user, saveUser } = this.props;
        const { profile_picture } = this.state;
        this.setState({ editProfilePic: 'hide' });
        const new_user = Object.assign({}, user);
        new_user.profile_picture = profile_picture;
        saveUser(new_user);
    }

    handleEditProfilePic() {
        this.setState({ editProfilePic: 'show' });
    }

    handleEdit() {
        const { is_edit } = this.state;
        const editing = !is_edit;
        this.setState({ is_edit: editing });

        if (editing) {
            this.setState({ button_text: 'Save' });
        } else {
            this.setState({ button_text: 'Edit' });
            this.handleSave();
        }
    }

    handleEditStart(index, start) {
        const { availabilityList } = this.state;
        const temp = availabilityList;
        temp[index].start = start;
        this.setState({ availabilityList: temp });
    }

    handleEditStartGrade(index, start) {
        const { subjects } = this.state;
        const temp = subjects;
        temp[index].start_grade =
            start.type === 'number' ? parseInt(start, 10) : start;
        this.setState({ subjects: temp });
    }

    handleEditEnd(index, end) {
        const { availabilityList } = this.state;
        const temp = availabilityList;
        temp[index].end = end;
        this.setState({ availabilityList: temp });
    }

    handleEditEndGrade(index, end) {
        const { subjects } = this.state;
        const temp = subjects;
        temp[index].end_grade = end.type === 'number' ? parseInt(end, 10) : end;
        this.setState({ subjects: temp });
    }

    handleEditDate(index, date) {
        const { availabilityList } = this.state;
        const temp = availabilityList;
        temp[index].date = date;
        this.setState({ availabilityList: temp });
    }

    handleEditSubject(index, subject) {
        const { subjects } = this.state;
        const temp = subjects;
        temp[index].subject = subject;
        this.setState({ subjects: temp });
    }

    handleAddSchedule() {
        const { is_edit, availabilityList } = this.state;
        // default new schedule is Monday
        if (is_edit) {
            const temp = [...availabilityList];
            temp.push({
                date: 'Monday',
                start: '00:00',
                end: '00:00'
            });
            this.setState({ availabilityList: temp });
        }
    }

    handleEditFavorite(index, fav) {
        const { favorites } = this.state;
        const temp = favorites;
        temp[index].favorite = fav;
        this.setState({ favorites: temp });
    }

    handleEditFavSubject(index, subj) {
        const { favorites } = this.state;
        const temp = favorites;
        temp[index].subject = subj;
        this.setState({ favorites: temp });
    }

    handleAddFavorite() {
        const { subjects } = this.props;
        const { is_edit, favorites } = this.state;
        if (is_edit) {
            const temp = [...favorites];
            temp.push({
                favorite: '',
                subject: subjects.availableSubjects[0] || DEFAULT_SUBJ
            });
            this.setState({ favorites: temp });
        }
    }

    handleAddSubject() {
        const { subjects: propSubj } = this.stte;
        const { is_edit, subjects: stateSubj } = this.state;
        if (is_edit) {
            const temp = [...stateSubj];
            temp.push({
                subject: propSubj.availableSubjects[0] || DEFAULT_SUBJ,
                start_grade: 6,
                end_grade: 12
            });
            this.setState({ subjects: temp });
        }
    }

    handleRemoveSchedule(index) {
        const { availabilityList } = this.state;
        const temp = availabilityList;
        temp.splice(index, 1);
        this.setState({ availabilityList: temp });
    }

    handleRemoveSubject(index) {
        const { subjects } = this.state;
        const temp = subjects;
        temp.splice(index, 1);
        this.setState({ subjects: temp });
    }

    handleRemoveFavorite(index) {
        const { favorites } = this.state;
        const temp = favorites;
        temp.splice(index, 1);
        this.setState({ favorites: temp });
    }

    handleBioChange(event) {
        this.setState({ bio: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleGmailChange(event) {
        this.setState({ gmail: event.target.value });
    }

    handleProfilePicChange(event) {
        this.setState({ profile_picture: event.target.value });
    }

    render() {
        const { user } = this.props;
        const {
            availabilityList,
            is_edit,
            subjects,
            favorites,
            editProfilePic,
            profile_picture,
            email,
            gmail,
            bio,
            button_text
        } = this.state;
        const availabilityItems = availabilityList.map(
            (availability, index) => (
                <div key={availability} className="time-item">
                    <TimePicker
                        index={index}
                        date={availability.date}
                        start={availability.start}
                        end={availability.end}
                        is_edit={is_edit}
                        handleRemoveSchedule={this.handleRemoveSchedule}
                        handleEditStart={this.handleEditStart}
                        handleEditEnd={this.handleEditEnd}
                        handleEditDate={this.handleEditDate}
                    />
                </div>
            )
        );
        const subjectItems = subjects.map((subject, index) => (
            <div key={subject} className="time-item">
                <SubjectPicker
                    index={index}
                    subject={subject.subject}
                    start={subject.start_grade}
                    end={subject.end_grade}
                    is_edit={is_edit}
                    handleRemoveSubject={this.handleRemoveSubject}
                    handleEditStart={this.handleEditStartGrade}
                    handleEditEnd={this.handleEditEndGrade}
                    handleEditSubject={this.handleEditSubject}
                />
            </div>
        ));
        const favoriteItems = favorites.map((favorite, index) => (
            <div key={favorite} className="time-item">
                <FavoritePicker
                    index={index}
                    subject={favorite.subject}
                    favorite={favorite.favorite}
                    is_edit={is_edit}
                    handleRemoveFavorite={this.handleRemoveFavorite}
                    handleEditSubject={this.handleEditFavSubject}
                    handleEditFavorite={this.handleEditFavorite}
                />
            </div>
        ));

        return (
            <div className="row tutor-dash animated fadeInLeft">
                <div className="col">
                    <div className="text-center row">
                        <h4 className="lighter-text text-uppercase tutor-events-header">
                            {' '}
                            Profile
                        </h4>
                    </div>
                    <div className="row profile-wrapper">
                        <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                            <div className="row">
                                <div className="col-sm-6 col-md-5 profile-pic-wrapper">
                                    <img
                                        src={user.profile_picture}
                                        alt="user-pic"
                                        className="tutor-profile-picture img-circle"
                                    />
                                    {/* eslint-disable */}
                                    <div
                                        type="button"
                                        className="edit-profile-pic"
                                        onClick={this.handleEditProfilePic}
                                    >
                                        <div className="edit-profile-pic-text">
                                            <h3 className="edit-profile-header">
                                                <span className="glyphicon glyphicon-pencil" />{' '}
                                                Edit
                                            </h3>
                                        </div>
                                    </div>
                                    {/* eslint-enable */}
                                    <div
                                        className={`edit-img-input-${editProfilePic}`}
                                    >
                                        <input
                                            className="input input-sm"
                                            value={
                                                profile_picture ===
                                                '/images/default_user_img.png'
                                                    ? ''
                                                    : profile_picture
                                            }
                                            placeholder="Enter Image URL"
                                            type="text"
                                            onChange={
                                                this.handleProfilePicChange
                                            }
                                        />
                                        <button
                                            onClick={this.handleSaveProfilePic}
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-7 profile-info-wrapper">
                                    <div className="profile-info">
                                        <h3 className="tutor-profile-name">
                                            {/* eslint-disable-next-line prettier/prettier */}
                                            {`${user.first_name} ${user.last_name}`}
                                        </h3>
                                        <small>
                                            <cite title="Atlanta, USA">
                                                Atlanta, USA{' '}
                                                <i className="glyphicon glyphicon-map-marker" />
                                            </cite>
                                        </small>
                                        <h4 className="tutor-username">
                                            {user._id}
                                        </h4>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <div className="row tutor-profile-input">
                                            <div className="col-xs-12">
                                                <h5>
                                                    <i className="glyphicon glyphicon-calendar" />{' '}
                                                    Join Date:
                                                </h5>
                                                <p>
                                                    {new Date(
                                                        user.join_date
                                                    ).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row tutor-profile-input">
                                            <div className="col-xs-12">
                                                <h5>
                                                    <i className="glyphicon glyphicon-envelope" />{' '}
                                                    Email:
                                                </h5>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={
                                                        this.handleEmailChange
                                                    }
                                                    disabled={!is_edit}
                                                />
                                            </div>
                                        </div>
                                        <div className="row tutor-profile-input">
                                            <div className="col-xs-12">
                                                <h5>
                                                    <i className="glyphicon glyphicon-envelope" />{' '}
                                                    Gmail:
                                                </h5>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={gmail}
                                                    onChange={
                                                        this.handleGmailChange
                                                    }
                                                    disabled={!is_edit}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-12 tutor-profile-input">
                                                <h5>
                                                    <i className="glyphicon glyphicon-home" />{' '}
                                                    Bio:
                                                </h5>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={bio}
                                                    onChange={
                                                        this.handleBioChange
                                                    }
                                                    disabled={!is_edit}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h5>
                                                <i className="glyphicon glyphicon-apple" />{' '}
                                                Subjects:
                                            </h5>
                                            {subjectItems}
                                            <button
                                                type="button"
                                                className="btn btn-success add-subject"
                                                onClick={this.handleAddSubject}
                                                disabled={!is_edit}
                                            >
                                                Add a Subject
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h5>
                                                <i className="glyphicon glyphicon-apple" />{' '}
                                                Favorites:
                                            </h5>
                                            {favoriteItems}
                                            <button
                                                type="button"
                                                className="btn btn-success add-subject"
                                                onClick={this.handleAddFavorite}
                                                disabled={!is_edit}
                                            >
                                                Add a Favorite
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h5>
                                                <i className="glyphicon glyphicon-time" />{' '}
                                                Schedule:
                                            </h5>
                                            {availabilityItems}
                                            <button
                                                type="button"
                                                className="btn btn-success add-time"
                                                onClick={this.handleAddSchedule}
                                                disabled={!is_edit}
                                            >
                                                Add a time
                                            </button>
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

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    subjects: PropTypes.array.isRequired,
    saveUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    subjects: state.subjects
});

const mapDispatchToProps = dispatch => ({
    saveUser: user => dispatch(saveTutor(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
