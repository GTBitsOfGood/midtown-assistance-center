import React from 'react';
import { PieChart } from 'react-easy-chart';
import { Legend } from 'react-easy-chart';
import { DropdownButton, MenuItem, Panel, Col } from 'react-bootstrap';
import styles from '../../public/css/admin.css';

class SubjectPieStatistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pieData = [
      { key: 'Biology', value: 10 },
      { key: 'Algebra', value: 20 },
      { key: 'Geometry', value: 50 },
      { key: 'Chemistry', value: 45 },
      { key: 'Calculus', value: 15 }
    ];

    return (
      <div className={styles.admin_statistics_card}>
        <Panel>
          <h2 className={styles.admin_statistics_title}>
            {' '}
            Most Searched Subjects
          </h2>

          <Col md={8}>
            <PieChart size={250} labels data={pieData} />
          </Col>
          <Col md={4}>
            <Panel className={styles.admin_statistics_general_legend}>
              <h5 className="center">Number of Searches</h5>
              <Legend data={pieData} dataId={('key', 'value')} />
            </Panel>
          </Col>
          <Col className={styles.admin_statistics_dropdown} md={3}>
            <DropdownButton title="Select Grade">
              <MenuItem> All grades </MenuItem>
              <MenuItem> Grade 6 </MenuItem>
              <MenuItem> Grade 7 </MenuItem>
              <MenuItem> Grade 8 </MenuItem>
              <MenuItem> Grade 9 </MenuItem>
              <MenuItem> Grade 10 </MenuItem>
              <MenuItem> Grade 11 </MenuItem>
              <MenuItem> Grade 12 </MenuItem>
            </DropdownButton>
          </Col>
        </Panel>
      </div>
    );
  }
}
export default SubjectPieStatistics;
