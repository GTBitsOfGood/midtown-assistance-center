import styles from '../../../../public/css/admin.css';
import React from 'react';
import { connect } from 'react-redux';

class NavigationHeader extends React.Component {
    constructor(props) {
        super(props);
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader);
