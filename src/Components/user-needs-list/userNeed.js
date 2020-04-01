import React from 'react';
import './userNeedsList.css';

const UserNeed = ({ need }) => {
    // console.log(need)
    return (
        <div className="userneed-container">
            <div className="userneed-inner">
            <div className="userneed-text">{need ? ` ${need.needType} ` : null}</div>
            <div className="userneed-text">{need ? ` ${need.needDescription} `: null}</div>
            <div className="userneed-text">{need ? ` ${need.exchangeType} `: null}</div>
            <div className="userneed-text">{need ? ` ${need.exchangeDescription} `: null}</div>
            </div>
        </div>
    )
}

export default UserNeed;