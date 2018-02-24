import React from 'react';
import { Link } from 'react-router-dom'

class ApproveTutorItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="approve-tutor-item text-center container col-md-12">
        <h3>{this.props.data.first_name + " " + this.props.data.last_name}</h3>
        <h4 className="lighter-text">{this.props.data.email}</h4>
        <h4><Link to="#" className="mac_anchor lighter-text">View Application</Link></h4>
        <button className="btn  btn-success approve-button">APPROVE</button>
        <button className="btn  btn-danger reject-button">REJECT</button>
      </div>
    );
  }
}
export default ApproveTutorItem;