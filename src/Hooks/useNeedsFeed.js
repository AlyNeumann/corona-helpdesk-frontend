import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Components/user-context/userContext';
import Cookies from 'js-cookie';

const useNeedsFeed = () => {

    //user state
    const user = useContext(UserContext);
    console.log(user)
    const userInfo = user[0];
    console.log(userInfo)

    //state for needs 
    const [needsFeed, setNeedsFeed] = useState([])
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);

    const getNeedsFeed = () => {
        //TODO: test this!
        const token = Cookies.get("token");
        const lat = userInfo.houseLocation.coordinates[0]
        const lng = userInfo.houseLocation.coordinates[1]
        const radius = 100
        const url = `/api/needFeed/${lat}/${lng}/${radius}`
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