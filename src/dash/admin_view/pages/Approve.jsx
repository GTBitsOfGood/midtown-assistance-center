import styles from '../../../../public/css/admin.css';
import React from 'react';
import ApproveTutorItem from '../ApproveTutorItem.jsx';

class Approve extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ApproveTutorItem />
      </div>
    );
  }
}
export default Approve;
