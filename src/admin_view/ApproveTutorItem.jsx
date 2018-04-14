import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../public/css/admin.css';

class ApproveTutorItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="approve-tutor-item text-center container col-md-4">
        {/** 
        <h3>{this.props.data.first_name + " " + this.props.data.last_name}</h3>
        <h4 className="lighter-text">{this.props.data.email}</h4>

        <button className="btn  btn-success approve-button">APPROVE</button>
        <button className="btn  btn-danger reject-button">REJECT</button>
      **/}

        <h2>Jane Doe</h2>
        <h4 className="lighter-text gold_text">jane.doe@gmail.com</h4>
        <h4 className="lighter-text gold_text">Georgia Tech</h4>

        <div className={styles.approve_tutor_bio}>
          <p>Tutor Bio goes here</p>
        </div>
        <button className={styles.view_more}>View Application</button>
      </div>
    );
  }
}
export default ApproveTutorItem;
