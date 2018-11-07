import React from 'react';
import { connect } from 'react-redux';
import styles from '../../../public/css/admin.css';
import { approveTutor } from '../../redux/actions/admin_actions';

class BanItem extends React.Component {
    constructor(props) {
        super(props);
        this.foo = this.foo.bind(this);
    }

    foo() {
        this.props;
    }

    render() {
        const { banned, explanation, personOfInterest, reporter, reporterType, time } = this.props.ban;

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
                            onClick={() =>
                                this.props.approveTutor(
                                    this.props.tutor,
                                    'approved'
                                )
                            }
                            className={styles.approve_btn}
                        >
                            Approve
                        </button>
                        <button
                            onClick={() =>
                                this.props.approveTutor(
                                    this.props.tutor,
                                    'denied'
                                )
                            }
                            className={styles.deny_btn}
                        >
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        approveTutor: (tutor, status) => dispatch(approveTutor(tutor, status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanItem);
