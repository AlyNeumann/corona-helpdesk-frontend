//this will be a component that shows the user their needs in list form
import React from 'react';
import UserNeed from './userNeed';
import './userNeedsList.css';

const UserNeedsList = ({ user, needs }) => {
    // console.log(needs);

    return (
        <div className="user-needs-list-container">
            <div className="user-needs-list-inner">
            <h3 className="needs-title"> Your Needs List </h3>
            <div className="needs-title">Item needed     |     Exchange offered     |     Quantity</div>
                <ul>
                {needs.map(need => {
                    return <UserNeed user={user} need={need} key={need.quantity}/>
                })}
                </ul>
            </div>
        </div>
    )
}

export default UserNeedsList;