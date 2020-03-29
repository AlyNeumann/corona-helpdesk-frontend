import React from 'react';
import './userNeedsList.css';

const UserNeed = ({ need }) => {
    // console.log(need)
    return (
        <div className="userneed-container">
            <div className="userneed-inner">
            <div className="userneed-text">{need ? ` ${need.need} ` : null}</div>
            <div className="userneed-text">{need ? ` ${need.exchange} `: null}</div>
            <div className="userneed-text">{need ? ` ${need.quantity} `: null}</div>
            </div>
        </div>
    )
}

export default UserNeed;