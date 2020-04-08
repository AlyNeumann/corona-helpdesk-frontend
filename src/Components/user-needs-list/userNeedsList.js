//this will be a component that shows the user their needs in list form
import React from 'react';
import UserNeed from './userNeed';
import './userNeedsList.css';

const UserNeedsList = ({ user, needs }) => {


    return (
        <div className="user-needs-list-container">
            <div className="user-needs-list-inner">
                <h2 className="needs-title"> Needs List </h2>
                <div className="needs-label">What I need      |     What I can exchange</div>
               {/* {needs ? <DraggableList items={[needs]}/> : null} */}
                {needs ?
                    <ul>
                        {needs.map(need => {

                            return <UserNeed user={user} need={need} key={need._id} />
                        })}
                    </ul> : <div>No current needs.</div>}
            </div>
        </div>
    )
}

export default UserNeedsList;