import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';

class TutorTerms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkLowIncome: false,
            checkComputerHelp: false,
            checkRatingRequired: false,
            checkReportBehavior: false,
            checkTutorHelp: false,
            canSubmit: false
        };

        this.toggle = this.toggle.bind(this);
        this.checkCanSubmit = this.checkCanSubmit.bind(this)
    }

    toggle(event) {
        const name = event.target.name;
        this.setState(prevState => ({ [name]: !prevState[name] }), this.checkCanSubmit);
    }

    checkCanSubmit() {
        const { checkLowIncome, checkComputerHelp,
            checkRatingRequired, checkReportBehavior, checkTutorHelp} = this.state;
        const canSubmit = checkLowIncome && checkComputerHelp &&
            checkRatingRequired && checkReportBehavior && checkTutorHelp;
        this.props.handleTermsAgreementChange(canSubmit);
        this.setState({ canSubmit });
    }

    render() {
        return (
            <div className="row col-xs-12">
                <hr className="signup-divider"></hr>
                <h4 className="terms-header">Terms and Agreements</h4>
                { this.state.canSubmit ? (
                    ''
                ) : (
                    <HelpBlock>All boxes must be checked</HelpBlock>
                )}
                <div align="left" className="terms">
                    <FormGroup check>
                        <Label check>
                            <Input name="checkLowIncome" id="checkLowIncome" type="checkbox" onClick={this.toggle} />
                            I understand that the students or parents I am tutoring are from low income families.  I agree to be sensitive to this.
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkComputerHelp" type="checkbox" onClick={this.toggle}/>
                            I understand that some families may need help with basic tech/computer support in addition to scholastic content.
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkRatingRequired" type="checkbox" onClick={this.toggle}/>
                            I understand that a rating for every tutoring session is required by both tutor and student.
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label check>
                            <Input name="checkReportBehavior" type="checkbox" onClick={this.toggle}/>
                            I understand and agree to report any inappropriate behavior via the rating popup including:
                        </Label>
                        <ul>
                            <li>Any request for contact outside of the tutoring program</li>
                            <li>Any request for monetary support</li>
                            <li>Any request for personal information</li>
                            <li>Use of Inappropriate/bad language</li>
                        </ul>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkTutorHelp" type="checkbox" onClick={this.toggle}/>
                            I understand that if I need content to help me tutor, I can try out <a href="https://www.powermylearning.org/">Power My Learning</a>.
                        </Label>
                        <p>Thank you for giving your time to help make the community better!</p>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default TutorTerms;