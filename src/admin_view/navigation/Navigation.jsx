import styles from '../../../public/css/admin.css';
import React from 'react';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        active:"dashboard"
    }
    this.setActive = this.setActive.bind(this);
  }

  setActive(page) {
    page = page.toLowerCase();
    this.props.history.push("/admin/" + page);
    this.setState({active:page});
  }

  render() {
    return (
      <div className={ styles.admin_nav }>
        <NavigationHeader/>
        <NavigationItem func={this.setActive} page="Dashboard" icon="stats" active={this.state.active == "dashboard"}/>
        <NavigationItem func={this.setActive} page="Approve" icon="check" active={this.state.active == "approve"}/>
        <NavigationItem func={this.setActive} page="Schools" icon="apple" active={this.state.active == "schools"}/>
      </div>
    );
  }
}
export default Navigation;