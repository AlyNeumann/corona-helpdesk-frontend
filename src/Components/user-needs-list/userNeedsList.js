//this will be a component that shows the user their needs in list form
import React from 'react';
import UserNeed from './userNeed';
import './userNeedsList.css';

const UserNeedsList = () => {

    //TODO: call api here for needs list
    const needs = [
        { need: "I need this thing", exchange: "money", quantity: 10 },
        { need: "Here is another thing I need",exchange: "mangos", quantity: 2 },
        { need: "Yes, another need indeed!", exchange: "I'll do your taxes!", quantity: 104 }
    ]
    return (
        <div className="user-needs-list-container">
            <div className="user-needs-list-inner">
            <h3 className="needs-title"> Your Needs List </h3>
                <ul>
                {needs.map(need => {
                    return <UserNeed need={need}/>
                })}
                </ul>
            </div>
        </div>
    )
}

export default UserNeedsList;