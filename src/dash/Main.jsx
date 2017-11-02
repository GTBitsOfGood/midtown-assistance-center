import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/userActions.js';
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
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
        return (
            <div>Hello {this.props.user}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user : state.user.username,
        password: state.user.password
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(updateUser(user))
    };
};

const DefaultMain = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default DefaultMain;