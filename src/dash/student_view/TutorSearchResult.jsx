import React from 'react';
import PropTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';
import TutorReviewModal from './TutorReviewModal';
import TutorRequestModal from './TutorRequestModal';
import Subject from './Subject';
import Availability from './Availability';

class TutorSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullStars: Math.floor(props.tutor.rating),
            halfStars: Math.floor(
                (props.tutor.rating - Math.floor(props.tutor.rating)) /
                    0.5
            ),
            emptyStars: 5 -
                Math.floor(props.tutor.rating) -
                Math.floor(
                    (props.tutor.rating -
                        Math.floor(props.tutor.rating)) /
                        0.5
                ),
        };
        this.showTutorModal = this.showTutorModal.bind(this);
        // this.onHangoutsButton = this.onHangoutsButton.bind(this);
    }

    showTutorModal() {
        $(`#Modal_${this.props.tutor.first_name}_request`).modal('hide');
        $(`#Modal_${this.props.tutor.first_name}`).modal('show');
    }

    // onHangoutsButton() {
    //     this.setState({ hangoutsLink: this.props.tutor.session.hangouts_link });
    //     //window.open(this.props.tutor.session.hangouts_link, '_blank');
    //     //this.props.socket.emit('student-join', {'session':this.props.tutor.session.eventId, 'student': this.props.username});
    // }

    render() {
        const { tutor, id, updateTutors, socket, username } = this.props;
        const { fullStars, halfStars, emptyStars } = this.state;
        const subjects = tutor.subjects.map(subject => (
            <Subject
                is_favorite={false}
                subject={subject.subject}
                start_grade={subject.start_grade}
                end_grade={subject.end_grade}
            />
        ));

        const favorites = tutor.favorites.map(fav => (
            <Subject is_favorite subject={fav.favorite} />
        ));
        const date = new Date(tutor.join_date).toLocaleDateString();
        const stars = [];
        function addRatingStars(numStars, starImageString) {
            for (let x = 0; x < numStars; x++) {
                stars.push(
                    <span>
                        <img
                            className="star"
                            src={starImageString}
                            width="25"
                            height="25"
                            alt=""
                        />
                    </span>
                );
            }
        }
        addRatingStars(fullStars, '/images/full-star.png');
        addRatingStars(halfStars, '/images/half-star.png');
        addRatingStars(emptyStars, '/images/empty-star.png');
        
        return (
            <div>
                <div className="panel panel-default tutor-panel">
                    <div className="panel-heading tutor-panel-heading"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        data-target={`#collapse${id}`}

                    >
                        <div className="col-md-2">
                            <img
                                alt="tutor profile pic"
                                className="tutor-profile-pic img-circle"
                                src={tutor.profile_picture}
                                height="125"
                                width="125"
                            />
                        </div>
                        <div className="">
                            <a
                                data-toggle="collapse"
                                className="tutor-name"
                                data-parent="#accordion"
                                href={`#collapse${id}`}
                            >
                                <h3 className="">
                                    {`${tutor.first_name} ${tutor.last_name}`}
                                    <span 
                                        className={(tutor.online)
                                            ? "online-img"
                                            : "online-img tutor-offline"}
                                    >
                                        {(tutor.online) ? 'Online'
                                            : 'Offline'}
                                    </span>
                                    {
                                        (tutor.session) ?
                                            <span className="online-img tutor-offline">
                                                In Session
                                            </span>
                                            : ''
                                    }
                                    &emsp;
                                    {stars}
                                </h3>
                            </a>
                            <h4 className="tutor-subjects lighter-text">
                                Main Subjects:
                                <span>{subjects}</span>
                            </h4>
                            <h4 className="tutor-favorites lighter-text">
                                Favorites:
                                <span>{favorites}</span>
                            </h4>
                        </div>
                    </div>
                    <div
                        id={`collapse${id}`}
                        className="panel-collapse collapse"
                    >
                        <div className="panel-body tutor-panel-body">
                            <div className="tutor_details container col-md-12">
                                <div className="col-md-6">
                                    <h4>
                                        <strong>Details</strong>
                                    </h4>
                                    <h4 className="details">
                                        <span className="details-ic glyphicon glyphicon-briefcase" />
                                        <strong> Student</strong> at Georgia
                                        Tech
                                    </h4>
                                    <h4 className="details">
                                        <span className="details-ic glyphicon glyphicon-calendar" />
                                        <strong>{date}</strong> Join Date
                                    </h4>
                                    <h4 className="details">
                                        <span className="details-ic glyphicon glyphicon-star" />
                                        <strong>
                                            {' '}
                                            {Number(tutor.rating).toFixed(2)}
                                        </strong>{' '}
                                        rating out of{' '}
                                        {tutor.num_ratings} total
                                        ratings
                                    </h4>
                                    <h4 className="availability-info">
                                        <strong>Availability</strong>
                                    </h4>
                                    <Availability
                                        availability={tutor.availability}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <h4>
                                        <strong>Bio</strong>
                                    </h4>
                                    <h4 className="bio-text lighter-text">
                                        {tutor.bio}
                                    </h4>
                                </div>
                            </div>
                            <div className="request_hangout text-center">
                                <h4>{tutor.session ? `${tutor.first_name} is in an open tutoring session with ${tutor.session.students_attended.length} student(s).` : ''}</h4>
                                <button
                                    className="btn btn-md btn-default mac_button"
                                    type="button"
                                    data-toggle="modal"
                                    data-target={tutor.session ? `#Modal_${tutor.first_name}` : `#Modal_${tutor.first_name}_request`}
                                    data-backdrop="static"
                                >
                                    {tutor.session
                                        ? 'Request to Join Session'
                                        : 'Request a Session'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <TutorReviewModal
                        key={`modal-${id}`}
                        updateTutors={updateTutors}
                        socket={socket}
                        username={username}
                        subjects={tutor.subjects}
                        favorites={tutor.favorites}
                        firstName={tutor.first_name}
                        session={tutor.session}
                        tutor_id={tutor._id}
                    />
                    <TutorRequestModal
                        key={`modal-${id}`}
                        socket={socket}
                        username={username}
                        subjects={tutor.subjects}
                        favorites={tutor.favorites}
                        firstName={tutor.first_name}
                        tutorId={tutor._id}
                        showTutorModal={this.showTutorModal}
                    />
                </div>

            </div>
        );
    }
}

TutorSearchResult.propTypes = {
    tutor: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    updateTutors: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};
export default TutorSearchResult;
