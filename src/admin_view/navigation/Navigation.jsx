import styles from '../../../public/css/admin.css';
import React from 'react';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setActive = this.setActive.bind(this);
    }

    setActive(page) {
        page = page.toLowerCase();
        this.props.history.push('/admin/' + page);
    }

    render() {
        var currentPage = this.props.location.pathname.split('/')[2];
        return (
            <div className={styles.admin_nav}>
                <NavigationHeader />
                <NavigationItem
                    func={this.setActive}
                    page="Dashboard"
                    icon="stats"
                    active={currentPage == 'dashboard'}
                />
                <NavigationItem
                    func={this.setActive}
                    page="Approve"
                    icon="check"
                    active={currentPage == 'approve'}
                />
                <NavigationItem
                    func={this.setActive}
                    page="Schools"
                    icon="apple"
                    active={currentPage == 'schools'}
                />
            </div>
        );
    }
}
export default Navigation;
