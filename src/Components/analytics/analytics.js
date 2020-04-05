import React from 'react';
import TimeLineAnalytics from './timeline';
import GlobalTimeLine from './globalTimeline';
import CurrentCases from './currentCases';
import PieChart from './pieChart';
import ScoreBoard from './scoreBoard';
import './analytics.css';


//make data chart for all countries
//make timeline chart for canada
//canada - death rate & recovery rate 
//deaths confirmed critical recovered 
//global count

const Analytics = () => {


    return (
        <div className="anatylics-container">
            <div>
                <h2>Analytics</h2>
            </div>
            <ScoreBoard/>
            <div className="chart-container">
            <TimeLineAnalytics/>
            <GlobalTimeLine/>
            <CurrentCases/>
            <PieChart/>
            </div>
        </div>
    )
}

export default Analytics;
