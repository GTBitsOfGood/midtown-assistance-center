import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Report a malicious student review
 */
const reportReview = () => {
    window.alert('Sorry, this feature has not been implemented yet');
};

/**
 * Render the student review
 * @returns {HTML}
 */
const Review = props => {
    const { time, rating, comment } = props;
    const date = new Date(time);
    const stars = [];
    const empty_stars = [];
    for (let x = 0; x < rating; x++) {
        stars.push(<span key={x} className="glyphicon glyphicon-star" />);
    }
    for (let y = rating; y < 5; y++) {
        empty_stars.push(
            <span key={y} className="glyphicon glyphicon-star-empty" />
        );
    }
    const review = (
        <div className="tutor-review">
            <button
                type="button"
                onClick={reportReview}
                className="btn btn-sm report-btn"
            >
                Report
            </button>
            <h5>
                {stars}
                {empty_stars}
            </h5>
            <h5 className="review-date">{date.toLocaleString('en-US')}</h5>
            <h5>{comment}</h5>
        </div>
    );
    return <div>{rating === 0 ? '' : review}</div>;
};

Review.propTypes = {
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    state
});

export default connect(
    mapStateToProps,
    null
)(Review);
