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
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src="../../images/default_user_img.png" alt="" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h4>{ this.props.user }</h4>
                                    <small><cite title="Atlanta, USA">Atlanta, USA <i className="glyphicon glyphicon-map-marker">
                                    </i></cite></small>
                                    <p>
                                        <i className="glyphicon glyphicon-envelope"></i> asdf@email.com
                                        <br />
                                        <i className="glyphicon glyphicon-gift"></i> June 02, 1988</p>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary">
                                            Social</button>
                                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                            <span className="caret"></span><span className="sr-only">Social</span>
                                        </button>
                                        <ul className="dropdown-menu" role="menu">
                                            <li><a href="#">Twitter</a></li>
                                            <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                            <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                            <li className="divider"></li>
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