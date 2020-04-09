import React, { useState, useEffect } from 'react';
import NeedsList from './needslist';
import Cookies from 'js-cookie';
import { useSpring, animated } from 'react-spring';

const NeedsFeed = () => {
    //react spring
    const props = useSpring({
        opacity: 1,
        from: {opacity: 0},
        marginTop: 1,
        from: {marginTop: 500},
      });
 
    //state for needs 
    const [needsFeed, setNeedsFeed] = useState([])
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);

   
    const getNeedsFeed = () => {
        //TODO: pull this info from global user state
        const token = Cookies.get("token");
        const lat = 45.485271
        const lng = -73.581421
        const radius = 1000
        const url = `http://localhost:5000/needFeed/${lat}/${lng}/${radius}`

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
                }

            })

    }

    //fetch User's needs
    useEffect(() => {
        getNeedsFeed();
    }, [])

    return(
        <div className="needslist-container">
            <h2>Needs Feed</h2>
            <animated.div style={props}>
            {needsFeed? needsFeed.map(user => {
                return <NeedsList user={user} key={user._id}/>
            }): 'No needs right now!'}
        </animated.div>
        </div>
    )
}

export default NeedsFeed;