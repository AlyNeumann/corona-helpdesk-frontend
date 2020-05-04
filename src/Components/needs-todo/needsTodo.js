import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useSpring, animated } from 'react-spring'
import Need from './need';

import './needstodo.css';


const NeedsTodo = ({ user, needs }) => {
    //react spring
    const props1 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1500
    })
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 2000
    })

    // console.log(needs.length)
    return (
        <div className="needstodo-container">
            <div className="needstodo-inner">
                <div className="needs-title"><h2>Update Your Needs</h2></div>
                <animated.div style={props1}>
                <div className="needs-label">What I need      |     What I can exchange</div>
                </animated.div>
                <animated.div style={props2}>
                <ul className="needs-ul">
                    {needs.map(need => {
                        return <Need need={need} key={need._id} needs={needs} />
                    })}
                </ul>
                {(needs.length !== 6)  ? 
                   <Link to={{
                    pathname: '/addneeds',
                    state: {
                        "functionType": "add",
                        need: { need: "" },
                        needs
                    }
                }} >
                    <button
                        className="btn btn-secondary btn-text add-btn">
                        <AddBoxIcon className="buttonclass" />
                    </button>
                </Link> : "Please delete a need to add another!"}
                {/* <Link to={{
                    pathname: '/addneeds',
                    state: {
                        "functionType": "add",
                        need: { need: "" },
                        needs
                    }
                }} >
                    <button
                        className="btn btn-secondary btn-text add-btn">
                        <AddBoxIcon className="buttonclass" />
                    </button>
                </Link> */}
                </animated.div>
            </div>
        </div>)
}

export default NeedsTodo;