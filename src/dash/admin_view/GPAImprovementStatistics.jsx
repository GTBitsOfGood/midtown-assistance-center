import React from 'react';
import { DropdownButton, MenuItem, Panel, Col } from 'react-bootstrap';
import { LineChart, Legend } from 'react-easy-chart';
import styles from '../../../public/css/admin.css';

class GPAImprovementStatistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.admin_statistics_card}>
        <Panel>
          <h2 className={styles.admin_statistics_title}>
            {' '}
            Average Grade Level GPA Change
          </h2>
          <Col md={8}>
            <LineChart
              axes
              margin={{ top: 10, right: 10, bottom: 40, left: 60 }}
              axisLabels={{ x: 'Time', y: 'GPA Percent Change' }}
              width={300}
              height={265}
              data={[
                [{ x: 1, y: 0 }, { x: 2, y: -1 }, { x: 3, y: 1 }],
                [{ x: 1, y: 0 }, { x: 2, y: -2 }, { x: 3, y: -1 }],
                [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1.2 }],
                [{ x: 1, y: 0 }, { x: 2, y: 0.8 }, { x: 3, y: 2 }]
              ]}
            />
          </Col>

          {/*
          <Col md={4}>
          <Panel className={styles.admin_statistics_general_legend}>
                  <h5>Grade Level</h5>
                  <Legend
                    data = 
                    dataId=
                  />
            </Panel>

          </Col>

        */}

          <Col className={styles.admin_statistics_dropdown} md={4}>
            <DropdownButton title="Student Membership Time">
              <MenuItem> &le; 1 month </MenuItem>
              <MenuItem>&gt; 1 month </MenuItem>
              <MenuItem>&gt; 6 months </MenuItem>
              <MenuItem>&gt; 1 year </MenuItem>
            </DropdownButton>
          </Col>
        </Panel>
      </div>
    );
  }
}
export default GPAImprovementStatistics;
