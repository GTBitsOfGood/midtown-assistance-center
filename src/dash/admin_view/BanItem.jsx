import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../../../public/css/admin.css';
import { banUserAndUpdate } from '../../redux/actions/admin_actions';

class BanItem extends React.Component {
    constructor(props) {
        super(props);
        this.foo = this.foo.bind(this);
    }

    foo() {
        this.props;
    }

    render() {
        const { banUserAndUpdate } = this.props;
        const { explanation, personOfInterest, reporter, reporterType, time, _id } = this.props.ban;

        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        const dateTime = new Date(time).toLocaleDateString('en-US', options);
        return (
            <div className={styles.approve_tutor_item_wrapper}>
                <div className="approve-tutor-item">
                    <h3 className="text-center approve-tutor-header">
                        {personOfInterest}
                    </h3>
                    <h5>
                        <span className="tutor-ic-admin glyphicon glyphicon-user" />
                        <span className={styles.lighter_text}>
                            Person Reported:
                        </span>
                        {personOfInterest}
                    </h5>
                    <h5>
                        <span className="tutor-ic-admin glyphicon glyphicon-pencil" />
                        <span className={styles.lighter_text}>Reporter: </span>
                        {reporter}
                    </h5>
                    <h5>
                        <span className="tutor-ic-admin glyphicon glyphicon-apple" />
                        <span className={styles.lighter_text}>Reporter Type: </span>
                        {reporterType}
                    </h5>
                    <h5>
                        <span className="tutor-ic-admin glyphicon glyphicon-time" />
                        <span className={styles.lighter_text}>Time of Report: </span>
                        {dateTime}
                    </h5>
                    <h5>
                        <span className="tutor-ic-admin glyphicon glyphicon-list" />
                        <span className={styles.lighter_text}> Explanation: </span>
                        {explanation}
                    </h5>
                    <div className="col-sm-12 text-center">
                        <button
                            onClick={() => banUserAndUpdate(_id, true)}
                            className={styles.deny_btn}
                            type="button"
                        >
                            Ban
                        </button>
                        <button
                            onClick={() => banUserAndUpdate(_id, false)}
                            className={styles.approve_btn}
                            type="button"
                        >
                            Disregard
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

BanItem.propTypes = {
    ban: PropTypes.object.isRequired,
    banUserAndUpdate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        banUserAndUpdate: (ban_id, banned) => dispatch(banUserAndUpdate(ban_id, banned))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanItem);
