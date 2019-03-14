import React from 'react';

class BugReportForm extends React.Component {
    render() {
        return (
            <section className="bug-report">
                <div className="container">
                    <h4 className="text-center head bug-h4">Found An Issue?</h4>
                    <div className="row text-center">
                        <div className="row bug-button">
                            <div className="col-md-offset-2 col-md-8 mx-auto text-center">
                                <a href="https://goo.gl/forms/opEfRrmTIDUfrQxz1" className="bug-report-link">
                                    Let us know!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BugReportForm;
