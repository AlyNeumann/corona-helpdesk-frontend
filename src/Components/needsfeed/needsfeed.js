import React, { useState, useEffect, useContext } from 'react';
import NeedsList from './needslist';
import Cookies from 'js-cookie';
import { useSpring, animated } from 'react-spring';
import { UserContext } from '../../Components/user-context/userContext';
import { Button } from '../../global';


//TODO: order returned users by upvote!

const NeedsFeed = () => {
    //bring in user for their position
    const user = useContext(UserContext);
    // console.log(user);
    const userObj = user[0];
    // console.log(userObj);
    const userLocation = userObj.houseLocation.coordinates
    // console.log(userLocation)
    const [radius, setRadius] = useState(100)

    //react spring
    const props = useSpring({
        opacity: 1,
        from: {opacity: 0},
        marginTop: 1,
        from: {marginTop: 1500},
        delay: 2000
      });
      const props1 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 500
    }) 
    const props2 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 1000
    }) 
    const props3 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay:2500
    }) 
 
    const handleClick = () => {
        setRadius(radius * 10)
    }
 
    //state for needs 
    const [needsFeed, setNeedsFeed] = useState([])
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);

   
    const getNeedsFeed = () => {
        //TODO: pull this info from global user state
        const token = Cookies.get("token");
        const lat = userLocation[0];
        const lng = userLocation[1];
        // const lat = 45.34
        // const lng = -75.90
        // console.log(radius)
        const url = `http://localhost:5000/needFeed/${lat}/${lng}/${radius}`
        // const url = `http://localhost:5000/needFeed/${lat}/${lng}/${radius}`

        //handle error messages
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            else return response
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => res.json()) //response is
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error)
                }
            })
            .then(response => {
                if (!errorMessage) {
                    setNeedsFeed(response);
                    // console.log(response)
                }

            })

    }

    //fetch User's needs
    useEffect(() => {
        getNeedsFeed();
    }, [user, radius])

    return(
        <div className="needslist-container">
             <animated.div style={props1}>
            <h2>Needs Feed</h2>
            </animated.div>
            <animated.div style={props2}>
            <h6 className="needsfeed-subtitle">Here are the users nearest to you who need stuff!</h6>
            </animated.div>
            <animated.div style={props3}>
            <div className="needsfeed-text">Click on their icon to see their profile & start a chat, or scroll down and click the button at the bottom to expand your search area!
                If you see users in the feed who you cannot help, you can upvote their needs using the star button under their user avatar so the post will get more attention from other users. 
            </div>
            </animated.div>
            <animated.div style={props}>
            {needsFeed? needsFeed.map(user => {
                return <NeedsList user={user} key={user._id}/>
            }): 'No needs right now!'}
              <Button className="fancy-btn-text" onClick={handleClick}>Click here to expand your search area</Button>
        </animated.div>
      
        </div>
    )
}

export default NeedsFeed;