import React from 'react';
import { LineChart } from 'react-easy-chart';
import { DropdownButton, MenuItem, Panel, Col } from 'react-bootstrap';
import styles from '../../../public/css/admin.css';

class LoginStatistics extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.admin_statistics_card}>
                <Panel>
                    <h2 className={styles.admin_statistics_title}>Usage</h2>
                    <Col md={8}>
                        <LineChart
                            margin={{
                                top: 10,
                                right: 10,
                                bottom: 50,
                                left: 50
                            }}
                            xType={'time'}
                            axes
                            lineColors={['#222633', '#EEB211']}
                            axisLabels={{ x: 'Date', y: 'Members Online' }}
                            width={300}
                            height={300}
                            data={[
                                [
                                    { x: '1-Jan-15', y: 20 },
                                    { x: '1-Feb-15', y: 10 },
                                    { x: '1-Mar-15', y: 33 },
                                    { x: '1-Apr-15', y: 45 },
                                    { x: '1-May-15', y: 15 }
                                ],
                                [
                                    { x: '1-Jan-15', y: 10 },
                                    { x: '1-Feb-15', y: 15 },
                                    { x: '1-Mar-15', y: 13 },
                                    { x: '1-Apr-15', y: 15 },
                                    { x: '1-May-15', y: 10 }
                                ]
                            ]}
                        />
                    </Col>

                    <Col
                        className={styles.admin_statistics_general_legend}
                        md={4}
                    >
                        <Panel>
                            <div className={styles.admin_line_graph_legend}>
                                <div className="student-box" />
                                <div className="student-value">
                                    <h4>Students</h4>
                                </div>
                            </div>
                            <div className={styles.admin_line_graph_legend}>
                                <div className="tutor-box" />
                                <div className="tutor-value">
                                    <h4>Tutors</h4>
                                </div>
                            </div>
                        </Panel>
                    </Col>

                    <Col className={styles.admin_statistics_dropdown} md={3}>
                        <DropdownButton title="Select Time">
                            <MenuItem>All time </MenuItem>
                            <MenuItem>This Week </MenuItem>
                            <MenuItem>This Month </MenuItem>
                            <MenuItem>This Year </MenuItem>
                        </DropdownButton>
                    </Col>
                </Panel>
            </div>
        );
    }
}
export default LoginStatistics;
