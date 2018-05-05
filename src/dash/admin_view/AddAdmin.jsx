import styles from '../../../public/css/admin.css';
import React from 'react';
import { getUnapprovedTutors } from '../../redux/actions/admin_actions';
import { connect } from 'react-redux';
import AddAdminForm from './AddAdminForm.jsx';

class AddAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const addForm = this.props.user.isSuperAdmin ? (
            <AddAdminForm />
        ) : (
            <h1>YOU CANNOT ADD ADMINS</h1>
        );
        return <div>{addForm}</div>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin);
