import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';

class StudentTerms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkFreeService: false,
            checkWillNotSue: false,
            checkOfficeHours: false,
            checkNotSameTutor: false,
            checkRatingRequired: false,
            checkReportBehavior: false,
            checkFeedbackComments: false,
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
        const { checkFreeService, checkWillNotSue, checkOfficeHours, checkNotSameTutor,
            checkRatingRequired, checkReportBehavior, checkFeedbackComments } = this.state;
        const canSubmit = checkFreeService && checkWillNotSue && checkOfficeHours && checkNotSameTutor
            && checkReportBehavior && checkRatingRequired && checkFeedbackComments;
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
                            <Input name="checkFreeService" id="checkFreeService" type="checkbox" onClick={this.toggle} />
                            I understand this is a free service. I am not guaranteed a result.
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkWillNotSue" type="checkbox" onClick={this.toggle}/>
                            I understand that by using this free service I waive any right to sue any of the parties involved (MAC, Georgia Tech, School, tutors).
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkOfficeHours" type="checkbox" onClick={this.toggle}/>
                            I understand that a tutor’s office hours are posted if there is no one immediately available to assist me.
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkNotSameTutor" type="checkbox" onClick={this.toggle}/>
                            I understand I may not get the same tutor for every session.
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
                            I understand and agree to report any inappropriate behavior including:
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
                            <Input name="checkFeedbackComments" type="checkbox" onClick={this.toggle}/>
                            I agree to share my feedback in the comments section following the “rating” to improve the site. Any success stories will help expand the program.
                        </Label>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default StudentTerms;