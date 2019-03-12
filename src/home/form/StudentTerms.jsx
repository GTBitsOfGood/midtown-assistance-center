import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';

class StudentTerms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkFreeService: false,
            checkWillNotSue: false,
            checkNotSameTutor: false,
            checkRatingRequired: false,
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
        const { checkFreeService, checkWillNotSue, checkNotSameTutor,
            checkRatingRequired} = this.state;
        const canSubmit = checkFreeService && checkWillNotSue && checkNotSameTutor &&
            checkRatingRequired;
        this.props.handleTermsAgreementChange(canSubmit);
        // console.log("checkCanSubmit " + canSubmit);
        this.setState({ canSubmit });
    }

    render() {
        return (
            <div className="row col-xs-12">
                <hr className="signup-divider"></hr> {/* TODO: make this less ugly */ }
                <h4 className="terms-header">Terms and Agreements</h4> { /* TODO: add padding */ }
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
                            <Input name="checkWillNotSue" type="checkbox" onChange={this.toggle}/>
                            I understand that by using this free service I waive any right to sue any of the parties involved (MAC, Georgia Tech, School, tutors).
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkNotSameTutor" type="checkbox" onChange={this.toggle}/>
                            I understand I may not get the same tutor for every session.
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input name="checkRatingRequired" type="checkbox" onChange={this.toggle}/>
                            I understand that a rating for every tutoring session is required by both tutor and student.
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <div className="row col-sm-12">Please note a tutor's office hours if there is no one immediately available to assist you.</div>
                        <div className="row col-sm-12">Please report any inappropriate behavior including:
                            <ul>
                                <li>Any request for contact outside of the tutoring program</li>
                                <li>Any request for monetary support</li>
                                <li>Any request for personal information</li>
                                <li>Use of Inappropriate/bad language</li>
                            </ul>
                            Please share your feedback to improve the site. Any success stories will help expand the program.
                        </div>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default StudentTerms;