import React from 'react';
import Profile from '../profile/profile';
import NeedsTodo from '../needs-todo/needsTodo';
import UserNeedsList from '../user-needs-list/userNeedsList';
import './profileHome.css';

//this component is the parent of Profile, Needs list, and Update Needs


const ProfileHome = () => {
    return(
        <div className="profile-home-container">
            <Profile />
            <NeedsTodo/>
            <UserNeedsList />
        </div>
    )
}

export default ProfileHome;