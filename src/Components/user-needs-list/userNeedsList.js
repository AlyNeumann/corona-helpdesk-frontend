//this will be a component that shows the user their needs in list form
import React from 'react';
import UserNeed from './userNeed';
import { useSpring, animated } from 'react-spring'
import './userNeedsList.css';


const UserNeedsList = ({ user, needs }) => {
      //react spring
      const props1 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 1000
    }) 
    const props2 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 1500
    }) 

    return (
        <div className="user-needs-list-container">
            <div className="user-needs-list-inner">
                <h2 className="needs-title"> Needs List </h2>
                <animated.div style={props1}>
                <div className="needs-label">What I need      |     What I can exchange</div>
                </animated.div>
               {/* {needs ? <DraggableList items={[needs]}/> : null} */}
               <animated.div style={props2}>
                {needs ?
                    <ul>
                        {needs.map(need => {

                            return <UserNeed user={user} need={need} key={need._id} />
                        })}
                        
                    </ul> : <div>No current needs.</div>}
                    </animated.div>
            </div>
        </div>
    )
}

export default UserNeedsList;