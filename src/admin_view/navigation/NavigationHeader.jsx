import styles from '../../../public/css/admin.css';
import React from 'react';

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
                <h4>Example Admin</h4>
                <h5 className={styles.lighter_text}>Example High School</h5>
            </div>
        );
    }
}
export default NavigationHeader;
