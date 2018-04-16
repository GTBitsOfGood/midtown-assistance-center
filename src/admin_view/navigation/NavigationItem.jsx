import styles from '../../../public/css/admin.css';
import React from 'react';

class NavigationItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                onClick={() => this.props.func(this.props.page)}
                className={
                    styles.admin_nav_item +
                    ' ' +
                    (this.props.active ? styles.admin_nav_item_active : '')
                }
            >
                <h5 className={styles.admin_nav_item_text}>
                    <span
                        className={
                            'glyphicon glyphicon-' +
                            this.props.icon +
                            ' ' +
                            styles.admin_nav_icon
                        }
                    />
                    {this.props.page}
                </h5>
            </div>
        );
    }
}
export default NavigationItem;
