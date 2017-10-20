import React from 'react';
import { connect } from 'react-redux';
import { setUserAction } from '../redux/userActions.js';
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var self = this;
        axios.get('/user')
            .then(function (response) {
                if (response.data !== '') {
                    console.log(response.data);
                    self.props.setUser(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        {this.props.user}
        return (
            //https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="well well-sm">
                            <div class="row">
                                <div class="col-sm-6 col-md-4">
                                    <img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" />
                                </div>
                                <div class="col-sm-6 col-md-8">
                                    <h4>
                                        Bhaumik Patel</h4>
                                    <small><cite title="San Francisco, USA">San Francisco, USA <i class="glyphicon glyphicon-map-marker">
                                    </i></cite></small>
                                    <p>
                                        <i class="glyphicon glyphicon-envelope"></i>email@example.com
                                        <br />
                                        <i class="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
                                        <br />
                                        <i class="glyphicon glyphicon-gift"></i>June 02, 1988</p>
                                    <!-- Split button -->
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary">
                                            Social</button>
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                            <span class="caret"></span><span class="sr-only">Social</span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="#">Twitter</a></li>
                                            <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                            <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                            <li class="divider"></li>
                                            <li><a href="#">Github</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user : state.user.username,
        password: state.user.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(setUserAction(user))
    }
}

const DefaultProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default DefaultProfile;