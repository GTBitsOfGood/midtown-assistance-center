import styles from '../../../public/css/admin.css';
import React from 'react';
import GPAImprovementStatistics from './GPAImprovementStatistics.jsx';
import SubjectPieStatistics from './SubjectPieStatistics.jsx';
import LoginStatistics from './LoginStatistics.jsx';
import UserList from './UserList.jsx';
import GeneralOverviewStatistics from './GeneralOverviewStatistics.jsx';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Row">
                {/* <GeneralOverviewStatistics /> */}
                {/* <SubjectPieStatistics /> */}
                {/* <LoginStatistics /> */}
                {/* <GPAImprovementStatistics /> */}
                <UserList />
            </div>
        );
    }
}
export default Dashboard;
