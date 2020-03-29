import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const NeedsFeed = () => {
 
    //state for needs 
    const [needsFeed, setNeedsFeed] = useState([])
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);
   
    const getNeedsFeed = () => {
        //TODO: pull this info from global user state
        const token = Cookies.get("token");
        const lat = 48
        const lng = 48
        const status = 1
        const url = `http://localhost:5000/needFeed/${lat}/${lng}/${status}`

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
                    console.log(response)
                    setNeedsFeed(response.neededList);
                }

            })

    }

    //fetch User's needs
    useEffect(() => {
        getNeedsFeed();
    }, [])

    return(
        <div>
            Needs Feed
        </div>
    )
}

export default NeedsFeed;