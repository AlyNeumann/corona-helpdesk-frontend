import React, { useEffect, useState } from 'react';

const usePagination = ({ page, roomId }) => {

    //need to get value of page here, starting at 2
    console.log(page, roomId)
    const [pastMessages, setPastMessages] = useState({
        text: '',
        to: '',
        from: '',
        time: ''
    })
    const [serverErorr, setServerError] = useState(null);
    const [errorMesssage, setErrorMessage] = useState(null);

    useEffect(() => {

        if (roomId) {
            // console.log(user, viewedUser)
            const url = 'http://localhost:3000/pastChat'

            //handle error messages
            const handleErrors = (error) => {
                console.log(error)
                if (error) {
                    setErrorMessage(error.error)
                } else if (error instanceof TypeError) {
                    setServerError(true)
                } else return error;
            }
            //fetch past chat
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ id: roomId, page }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json()) //response is

                .then(response => {
                    // console.log(response)
                    if (response.error || response == undefined) {
                        handleErrors(response)
                    } else {
                        setPastMessages(response)
                        // console.log(response)
                    }

                })
                .catch(error => {
                    if (error) {
                        console.log(error)
                        handleErrors(error)
                    } else if (error instanceof TypeError) {
                        setServerError(true)
                    }
                })
        }

    }, [roomId])
    
    return { pastMessages }

}

export default usePagination;