import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PieChart } from 'react-easy-chart';

const Statistics = props => {
    const {
        user: {
            stat: {
                statistics: { avgRating, totalRatings }
            }
        }
    } = props;
    const rating = Math.round(avgRating * 2) / 2;
    const stars = [];
    const halfStars = (rating - Math.floor(rating)) / 0.5;
    const emptyStars = 5 - Math.ceil(rating);
    const fullStars = Math.floor(rating);

    let keyId = 0;

    for (let x = 0; x < fullStars; x++) {
        stars.push(
            <span key={keyId++}>
                <img
                    alt="tutor-star"
                    className="tutor-star"
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
                    alt="tutor-star"
                    className="tutor-star"
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
                    alt="tutor-star"
                    className="tutor-star"
                    src="/images/empty-star.png"
                    width="20"
                    height="20"
                />
            </span>
        );
    }

    return (
        <div className="row animated fadeInRight">
            <div className="col">
                <div className="text-center row">
                    <h4 className="lighter-text text-uppercase tutor-events-header text-center">
                        Statistics
                    </h4>
                </div>
            </div>
            <div className="statistics row">
                <div className="col-xs-12">
                    <div className="col-md-6">
                        <div className="col">
                            <h4>
                                <span className="lighter-text">
                                    Average Rating:
                                </span>{' '}
                                {stars}{' '}
                            </h4>
                        </div>
                        <div className="col">
                            <h4>
                                <span className="lighter-text">
                                    Number of ratings:
                                </span>
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
};

Statistics.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(Statistics);
