import React from 'react';
import TimeLineAnalytics from './timeline';
import GlobalTimeLine from './globalTimeline';
import CurrentCases from './currentCases';
import PieChart from './pieChart';
import ScoreBoard from './scoreBoard';


//make data chart for all countries
//make timeline chart for canada
//canada - death rate & recovery rate 
//deaths confirmed critical recovered 
//global count

const Analytics = () => {


    return (
        <div>
            <div>
                <h3>Analytics</h3>
            </div>
            <ScoreBoard/>
            <TimeLineAnalytics/>
            <GlobalTimeLine/>
            <CurrentCases/>
            <PieChart/>
        </div>
    )
}

export default Analytics;
