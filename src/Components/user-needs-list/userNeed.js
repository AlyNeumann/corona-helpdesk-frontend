import React from 'react';
import './userNeedsList.css';

const UserNeed = ({ need }) => {
    console.log(need)
    return (
        <div className="userneed-container">
            <div className="userneed-inner">
            <div className="userneed-text">{need.need}</div>
            <div className="userneed-text">{need.exchange}</div>
            <div className="userneed-text">{need.quantity}</div>
            </div>
        </div>
    )
}

export default UserNeed;