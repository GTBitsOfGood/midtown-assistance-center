import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.reportReview = this.reportReview.bind(this);
    }

    /**
     * Report a malicious student review
     */
    reportReview() {
        let reason = window.prompt(
            'Please enter a reason for reporting this student (reason cannot be blank)'
        );
        if (reason !== '') {
            let new_review = this.props.review
            new_review.reported = true;
            new_review.reason_for_report = reason;
            let request = {
                _id: this.props.id,
                review: new_review
            }
            axios
            .post('/api/reportStudentReview', request)
            .then(function(response) {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    }

    /**
     * Render the student review
     * @returns {HTML}
     */
    render() {
        let date = new Date(this.props.review.time);
        let stars = [];
        let empty_stars = [];
        for (let x = 0; x < this.props.review.student_rating; x++) {
            stars.push(<span key={x} className="glyphicon glyphicon-star" />);
        }
        for (let y = this.props.review.student_rating; y < 5; y++) {
            empty_stars.push(
                <span key={y} className="glyphicon glyphicon-star-empty" />
            );
        }
        const review = (
            <div className="tutor-review">
                <button
                    onClick={this.reportReview}
                    className="btn btn-sm report-btn"
                >
                    Report
                </button>
                <h5>
                    {stars}
                    {empty_stars}
                </h5>
                <h5 className="review-date">{date.toLocaleString('en-US')}</h5>
                <h5>{this.props.review.student_comment}</h5>
            </div>
        );
        return <div>{this.props.review.student_rating === 0 ? '' : review}</div>;
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
