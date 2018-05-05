import styles from '../../../public/css/admin.css';
import React from 'react';
import ApproveTutorItem from './ApproveTutorItem.jsx';
import { connect } from "react-redux";
import { getUnapprovedTutors } from "../../redux/actions/admin_actions";

class Approve extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.getTutors();
    }

    render() {
        const renTutors = this.props.unapprovedTutors.map((obj, num) => {
            return obj.confirmed ? (
                <ApproveTutorItem
                    key={num}
                    tutor={obj}
                    id={num}
                />
            ) : (
                ''
            );
        });
        return <div>{renTutors}</div>;
    }
}

const mapStateToProps = state => {
  return {
    unapprovedTutors: state.adminView.unapprovedTutors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTutors: () => dispatch(getUnapprovedTutors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Approve);
