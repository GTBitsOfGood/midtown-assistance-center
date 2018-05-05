import styles from '../../../../public/css/admin.css';
import React from 'react';
import { connect } from 'react-redux';
import { saveTutor } from "../../../redux/actions/user_actions";

class NavigationHeader extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        console.warn('Logging out user');
        let new_tutor = Object.assign({}, this.props.user);
        new_tutor.online = false;
        new_tutor.logging_out = true;
        this.props.setTutorOffline(new_tutor);
    }

    render() {
        return (
            <div className={styles.admin_nav_header}>
                <div className={styles.admin_nav_photo_wrapper}>
                    <img
                        className={styles.admin_nav_photo}
                        src="../../images/default_admin_profile_pic.jpg"
                    />
                </div>
                <h4>
                    {this.props.user.first_name +
                        ' ' +
                        this.props.user.last_name}
                </h4>
                <h5 className={styles.lighter_text}>
                    {this.props.user.school}
                </h5>
              <button className="btn btn-danger" onClick={() => this.logout()}>Logout</button>
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
        setTutorOffline: tutor => dispatch(saveTutor(tutor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader);
