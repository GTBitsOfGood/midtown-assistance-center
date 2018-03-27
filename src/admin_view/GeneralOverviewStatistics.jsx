import React from 'react';
import {DropdownButton, MenuItem, Panel, Col, Row} from 'react-bootstrap';
import styles from '../../public/css/admin.css';


class GeneralOverviewStatistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    	<div className={styles.admin_overview_statistics_card}>
    		<h1 className={styles.general_statistics_title}>General Summary</h1>
    		
    		<Row>
	    		<Col md ={3} className={styles.general_statistics_card}>
	    			<h3>Average Tutor Session Duration</h3>
	    			<h1 className={styles.general_statistics_text}>36 minutes</h1>
	    		</Col>

	    		<Col md={3} className={styles.general_statistics_card}>
	    			<h3>Average Tutor Rating</h3>
	    			<h1 className={styles.general_statistics_text}>4.2/5</h1>
	    		</Col>

	    		<Col md={4} className={styles.general_statistics_card}>
	    			<h3>Average Office Hour Login Discrepency</h3>
	    			<h1 className={styles.general_statistics_text}>Late by 4 minutes</h1>
	    		</Col>

    		</Row>

    	</div>


     );
  }
}
export default GeneralOverviewStatistics;
