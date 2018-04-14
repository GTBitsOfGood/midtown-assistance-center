import styles from '../../../../public/css/admin.css';
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
    page = page.split(' ');
    console.log(page);
    let new_page =
      page[0].toLowerCase() +
      (page.length == 1 ? '' : '_' + page[1].toLowerCase());
    console.log(new_page);
    this.props.history.push('/admin/' + new_page);
  }

  render() {
    let currentPage = this.props.location.pathname.split('/')[2];
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
        <NavigationItem
          func={this.setActive}
          page="Add Admin"
          icon="check"
          active={currentPage == 'add_admin'}
        />
      </div>
    );
  }
}
export default Navigation;
