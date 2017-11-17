import React from 'react';
import ApproveTutorItem from './ApproveTutorItem.jsx';

class ApproveTutors extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const approveNewTutors = this.props.data.map((obj, num) => {
                                 return <ApproveTutorItem data={obj} id={num}/>;
                             });
    return (
      <div className="col-md-4 approve-tutors-panel text-center">
        <h3 className="tutor-dash-header text-uppercase"> Approve New Tutors ({this.props.data.length})</h3>
        <div className="approve-tutors-list">
        {approveNewTutors}
        </div>
      </div>
    );
  }
}
export default ApproveTutors;