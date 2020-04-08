import React from 'react';
import TimeLineAnalytics from './timeline';
import GlobalTimeLine from './globalTimeline';
import CurrentCases from './currentCases';
import PieChart from './pieChart';
import ScoreBoard from './scoreBoard';
import { useSpring, animated } from 'react-spring';
import './analytics.css';


//make data chart for all countries
//make timeline chart for canada
//canada - death rate & recovery rate 
//deaths confirmed critical recovered 
//global count

const Analytics = () => {
     //react spring styles
     const props1 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 500
    })
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 2000,
        marginTop: 1,
        from: { marginTop: 1000 },
        delay: 2000
    });




    return (
        <div className="anatylics-container">
            <div>
                <h2>Analytics</h2>
            </div>
            <animated.div style={props1}>
            <ScoreBoard/>
            </animated.div>
            <div className="chart-container">
            <animated.div style={props2}>
            <TimeLineAnalytics/>

            <PieChart/>
            <GlobalTimeLine/>
            {/* <CurrentCases/> */}
            </animated.div>
            </div>
        </div>
    )
}

export default Analytics;
