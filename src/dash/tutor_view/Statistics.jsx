import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions.js';
import {PieChart} from 'react-easy-chart';
import axios from "axios/index";

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: {}
        };
        this.getTutorStatistics = this.getTutorStatistics.bind(this);
    }

    componentWillMount() {
        this.getTutorStatistics();
    }

    getTutorStatistics() {
        var username = this.props.user._id;
        var self = this;
        axios.post('/api/getTutorStats', {'username':username})
            .then(function(response){
                if (response.data.success) {
                    console.log(response.data);
                    self.setState({
                        statistics: response.data.statistics,
                    });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    render() {
        let rating = Math.round(this.state.statistics.avgRating*2)/2;
        let stars = [];
        let halfStars = (rating - Math.floor(rating))/0.5;
        let emptyStars = (5 - Math.ceil(rating));
        let fullStars = Math.floor(rating);

        for (let x = 0; x < fullStars; x++) {
            stars.push(<span><img className="star" src='/images/full-star.png' width="20" height="20"></img></span>);
        }
        for (let y = 0; y < halfStars; y++) {
            stars.push(<span><img className="star" src='/images/half-star.png' width="20" height="20"></img></span>);
        }
        for (let z = 0; z < emptyStars; z++) {
            stars.push(<span><img className="star" src='/images/empty-star.png' width="20" height="20"></img></span>);
        }

        return (
            <div className="row animated fadeInRight">
                <h4 className="lighter-text text-uppercase tutor-events-header text-center">Statistics</h4>
                <div className="statistics row">
                    <div className="col-xs-12">
                        <div className="col-md-6">
                            <div className="col">
                                <h4><span className="lighter-text">Average Rating:</span> { stars } </h4>
                            </div>
                            <div className="col">
                                <h4><span className="lighter-text">Number of ratings:</span><strong> { this.state.statistics.totalRatings }</strong></h4>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="col-md-6">
                                <PieChart
                                    size={80}
                                    innerHoleSize={40}
                                    data={[
                                        { key: 'A', value: 97, color: '#EEB211' },
                                        { key: 'B', value: 3, color: '#aeb7b3' },
                                    ]}
                                />
                            </div>
                            <div className="col-md-6">
                                <h5 className="lighter-text"><strong>97%</strong> of office hours attended</h5>
                            </div>
                        </div>
                    </div>
                </div>
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
)(Statistics);

