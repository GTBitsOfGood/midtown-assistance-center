import styles from '../../../public/css/admin.css';
import React from 'react';
import BanItem from './BanItem.jsx';
import { connect } from 'react-redux';
import { getBans } from '../../redux/actions/admin_actions';

class BanDash extends React.Component {
    componentDidMount() {
        this.props.getBans();
    }

    render() {
        const renTutors = this.props.bans.map(ban => (
            <BanItem key={ban._id} ban={ban} id={ban._id} />
        ));
        return <div>{renTutors}</div>;
    }
}

const mapStateToProps = state => {
    return {
        bans: state.adminView.bans
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBans: () => dispatch(getBans())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanDash);
