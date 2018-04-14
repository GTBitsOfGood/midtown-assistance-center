import React from 'react';
import { connect } from 'react-redux';

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
    window.alert('Sorry, this feature has not been implemented yet');
  }

  /**
   * Render the student review
   * @returns {HTML}
   */
  render() {
    let date = new Date(this.props.time);
    let stars = [];
    let empty_stars = [];
    for (let x = 0; x < this.props.rating; x++) {
      stars.push(<span key={x} className="glyphicon glyphicon-star" />);
    }
    for (let y = this.props.rating; y < 5; y++) {
      empty_stars.push(
        <span key={y} className="glyphicon glyphicon-star-empty" />
      );
    }
    return (
      <div className="tutor-review">
        <button onClick={this.reportReview} className="btn btn-sm report-btn">
          Report
        </button>
        <h5>
          {stars}
          {empty_stars}
        </h5>
        <h5 className="review-date">{date.toLocaleString('en-US')}</h5>
        <h5>{this.props.comment}</h5>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
