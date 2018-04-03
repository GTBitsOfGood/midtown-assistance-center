import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';
import axios from 'axios';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.reportReview = this.reportReview.bind(this);
    }

    /**
     * Report a malicious student review
     */
    reportReview() {
        window.alert('Sorry, this feature has not been implemented yet');
    }

    /**
     * Render the student review
     * @returns {HTML}
     */
    render() {
        var date = new Date(this.props.time);
        var stars = [];
        var empty_stars = [];
        for (var x = 0; x < this.props.rating; x++) {
            stars.push(<span className="glyphicon glyphicon-star"></span>);
        }
        for (var y = this.props.rating; y < 5; y++) {
            empty_stars.push(<span className="glyphicon glyphicon-star-empty"></span>);
        }
        return (
            <div className="tutor-review">
                <button onClick={this.reportReview} className="btn btn-sm report-btn">Report</button>
                <h5>{stars}{empty_stars}</h5>
                <h5 className="review-date">{date.toLocaleString('en-US')}</h5>
                <h5>{this.props.comment}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);