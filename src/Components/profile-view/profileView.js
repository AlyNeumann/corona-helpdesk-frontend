import React from 'react';
import UsersProfile from './usersProfile';
import UserNeedsList from '../user-needs-list/userNeedsList';
import { useSpring, animated } from 'react-spring';
// import { Button } from '../../global'
// import { ThemeContext } from '../user-context/userContext';
// import { lightTheme, darkTheme } from '../../theme';

const ProfileView = (props) => {

    //react spring styles
    const props1 = useSpring({
        opacity: 1,
        from: { opacity: 0 }
    })
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1000
    })


    return (

        <div>
            {props.location.state.user ?
                <div className="profile-home-container">
                    <animated.div style={props1}>
                        <UsersProfile user={props.location.state.user} />
                    </animated.div>
                    <animated.div style={props2}>
                        <UserNeedsList user={props.location.state.user} needs={props.location.state.user.neededList} />
                    </animated.div>
                    {/* <Button
                        onClick={handleClick}
                    >Change Theme</Button> */}
                </div> : <div>Loading...</div>}
        </div>

    )
}

export default ProfileView;