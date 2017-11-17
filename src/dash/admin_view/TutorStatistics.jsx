import React from 'react';
import {LineChart} from 'react-easy-chart';

class TutorStatistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="tutor-statistics container col-md-8">
      <h3 className="tutor-dash-header text-uppercase text-center">Usage</h3>

      <div className="">
        <div className="btn-group btn-group-lg mac_button_group" role="group">
            <button type="button" className="btn btn-default ">D</button>
            <button type="button" className="btn btn-default ">M</button>
            <button type="button" className="btn btn-default ">Y</button>
        </div>
      </div>
        <div className="usage-chart col-md-10">
            <LineChart
                margin={{top: 10, right: 10, bottom: 50, left: 50}}
                xType={'time'}
                axes
                lineColors={['#222633', '#EEB211']}
                axisLabels={{x: 'Date', y: 'Members Online'}}
                width={window.innerWidth/2}
                height={window.innerHeight/2.5}
                data={[
                  [
                    { x: '1-Jan-15', y: 20 },
                    { x: '1-Feb-15', y: 10 },
                    { x: '1-Mar-15', y: 33 },
                    { x: '1-Apr-15', y: 45 },
                    { x: '1-May-15', y: 15 }
                  ], [
                    { x: '1-Jan-15', y: 10 },
                    { x: '1-Feb-15', y: 15 },
                    { x: '1-Mar-15', y: 13 },
                    { x: '1-Apr-15', y: 15 },
                    { x: '1-May-15', y: 10 }
                  ]
                ]}
              />
        </div>
        <div className="legend col-md-2">
        <div className="row">
            <div className="student-box">
            </div>
            <div className="student-value">
                <h4>Students</h4>
            </div>
        </div>
        <div className="row">
            <div className="tutor-box">
            </div>
            <div className="tutor-value">
                <h4>Tutors</h4>
            </div>
        </div>
        </div>
      </div>
    );
  }
}
export default TutorStatistics;