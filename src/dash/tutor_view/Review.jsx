import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportModal from './ReportModal';

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
class Review extends React.Component {

    constructor(props) {
        super(props);
        this.report= this.report.bind(this);
    }

    report() {
        // this.props;
    }

    render() {
        const { time, rating, comment, rating_id } = this.props;
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
                    onClick={this.report}
                    className="btn btn-sm report-btn"
                    data-toggle="modal"
                    data-target={`#Modal_${rating_id}`}
                    data-backdrop="static"
                >
                    Report
                </button>
                <h5>
                    {stars}
                    {empty_stars}
                </h5>
                <h5 className="review-date">{date.toLocaleString('en-US')}</h5>
                <h5>{comment}</h5>
                <ReportModal
                    rating_id={rating_id}
                    time={time}
                    comment={comment}
                    rating={rating}
                />
            </div>
        );
        return <div>{rating === 0 ? '' : review}</div>;

    }
};

Review.propTypes = {
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    rating_id: PropTypes.string.isRequired
};


export default connect(
    null,
    null
)(Review);
