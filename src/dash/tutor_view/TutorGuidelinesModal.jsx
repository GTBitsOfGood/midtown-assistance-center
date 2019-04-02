/**
 * @file
 * SessionReviewModal.jsx
 *
 * @fileoverview
 * React Component for the Session Review Modal
 * for the tutor to add comments and add a rating
 * for the google hangouts session. It also contains
 * a link to re-enter the session.
 */

import React from 'react';
import PropTypes from 'prop-types';

class TutorGuidelinesModal extends React.Component {
    /**
     * SessionModal constructor
     * set up rating stars
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            modalShowing: false
        };

        this.modalButtonClick = this.modalButtonClick.bind(this);
    }

    componentDidMount() {
        if (this.props.showModal) {
            $(
                `#Modal_${this.props.id}`
            ).modal('show');
        }
    }

    componentDidUpdate() {
        if (this.props.showModal && this.props.session.hangouts_link && !this.state.receivedLink) {
            window.open(this.props.session.hangouts_link, '_blank');
            this.setState({receivedLink:true});
        }
    }



    modalButtonClick() {
        window.open(this.props.session.hangouts_link);
        return false;
    }

    /**
     * Render the TutorModal
     * @returns {HTML}
     */
    render() {
        const { id, showModal } = this.props;

        return (
            <div>
                {/* eslint-disable jsx-a11y/tabindex-no-positive, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-autofocus */}
                <div
                    className="modal"
                    id={`Guidelines_${id}`}
                    tabIndex="1000"
                    role="dialog"
                    aria-labelledby={`#Modal_${id}Label`}
                    aria-hidden={!showModal}
                    autoFocus
                >
                    {/* eslint-enable */}
                    <div className="modal-dialog" role="document">
                        <div className="modal-content tutor-modal review-modal">
                            <div className="modal-header text-center">
                                <div>
                                    <h4 className="modal-title rate-session-header text-uppercase"
                                        id="exampleModalLabel">
                                        Before Your Call fjdkafjlksa
                                    </h4>
                                </div>

                                <div>
                                    <h4>
                                        <small>
                                            Hello, Please review the following Mac-tutoring guidelines and remember to report any students who exhibit any of the following behaviors
                                        </small>
                                    </h4>
                                </div>

                            </div>
                            <div className="modal-body text-left" id={`ModalBody_${id}`}>
                                <ul>
                                    <li>Any request for contact outside of the tutoring program</li>
                                    <li>Any request for monetary support</li>
                                    <li>Any request for personal information</li>
                                    <li>Use of inappropriate/bad language</li>
                                </ul>
                                <div className="mt-5">
                                    Remember if you need content to help you tutor, you can try out Power My Learning – <a href="https://www.powermylearning.org/">https://www.powermylearning.org/</a>
                                </div>

                            </div>
                            <div className="review-modal-footer modal-footer">
                                <a href="#" className="btn btn-default mac_button" onClick={this.modalButtonClick}
                                    target="_blank" data-dismiss="modal">
                                    <h5>
                                        Okay
                                    </h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


TutorGuidelinesModal.propTypes = {
    id: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired
};


export default TutorGuidelinesModal;
