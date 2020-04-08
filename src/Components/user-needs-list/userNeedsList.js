//this will be a component that shows the user their needs in list form
import React, { useEffect, useState } from 'react';
import UserNeed from './userNeed';
import DraggableList from './draggableList';
import './userNeedsList.css';

const UserNeedsList = ({ user, needs }) => {
    // console.log(needs);
    // const [needsIds, setNeedsIds] = useState([])
    // const needsIds = ["5e8b6219c1eee05e6f03f0bb","5e8882b47ed8ef3624cc2fff"]

    //TODO: for draggable reordering of needs
    // const needsIdsArr = (needs) => {
    //     needs.map(need => {
    //         console.log('loop')
    //         return setNeedsIds([...needsIds, need._id])
    //     })
    // }

    // console.log(needsIds)
    //     useEffect(() => {
    //         needsIdsArr(needs)
    //     }, [needs])
    //need to loop over needs and store _ids as an array to pass to Draggable list

    return (
        <div className="user-needs-list-container">
            <div className="user-needs-list-inner">
                <h2 className="needs-title"> Your Needs List </h2>
                <div className="needs-label">What I need      |     What I can exchange</div>
               {/* {needs ? <DraggableList items={[needs]}/> : null} */}
                {needs &&
                    <ul>
                        {needs.map(need => {

                            return <UserNeed user={user} need={need} key={need._id} />
                        })}
                    </ul>}
            </div>
        </div>
    )
}

export default UserNeedsList;