import React from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-easy-chart';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: {
        avgRating: 0,
        totalRatings: 0
      }
    };
  }

  render() {
    let avgRating = 0;
    let totalRatings = 0;
    if (this.props.user.stat) {
      avgRating = this.props.user.stat.statistics.avgRating;
      totalRatings = this.props.user.stat.statistics.totalRatings;
    }
    let rating = Math.round(avgRating * 2) / 2;
    let stars = [];
    let halfStars = (rating - Math.floor(rating)) / 0.5;
    let emptyStars = 5 - Math.ceil(rating);
    let fullStars = Math.floor(rating);

    let keyId = 0;

    for (let x = 0; x < fullStars; x++) {
      stars.push(
        <span key={keyId++}>
          <img
            className="star"
            src="/images/full-star.png"
            width="20"
            height="20"
          />
        </span>
      );
    }
    for (let y = 0; y < halfStars; y++) {
      stars.push(
        <span key={keyId++}>
          <img
            className="star"
            src="/images/half-star.png"
            width="20"
            height="20"
          />
        </span>
      );
    }
    for (let z = 0; z < emptyStars; z++) {
      stars.push(
        <span key={keyId++}>
          <img
            className="star"
            src="/images/empty-star.png"
            width="20"
            height="20"
          />
        </span>
      );
    }

    return (
      <div className="row animated fadeInRight">
        <h4 className="lighter-text text-uppercase tutor-events-header text-center">
          Statistics
        </h4>
        <div className="statistics row">
          <div className="col-xs-12">
            <div className="col-md-6">
              <div className="col">
                <h4>
                  <span className="lighter-text">Average Rating:</span> {stars}{' '}
                </h4>
              </div>
              <div className="col">
                <h4>
                  <span className="lighter-text">Number of ratings:</span>
                  <strong> {totalRatings}</strong>
                </h4>
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              <div className="col-md-6">
                <PieChart
                  size={80}
                  innerHoleSize={40}
                  data={[
                    {
                      key: 'A',
                      value: 97,
                      color: '#EEB211'
                    },
                    { key: 'B', value: 3, color: '#aeb7b3' }
                  ]}
                />
              </div>
              <div className="col-md-6">
                <h5 className="lighter-text">
                  <strong>97%</strong> of office hours attended
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
