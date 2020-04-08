import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useNeedsFeed = () => {

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

    return { needsFeed };
}

export default useNeedsFeed;