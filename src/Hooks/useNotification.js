 import { useEffect, useState } from 'react'
 
 const newMessages = ({ user }) => {

    const [notify, setNotify] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [serverError, setServerError] = useState(null);


        //users last login date 
        const last_login = user.last_login;
        const userName = user.name;
        console.log(last_login)
        console.log(userName)
        const id = user._id;
        const url = "http://localhost:3001/recentMessages"
        //fetch most recent messages with user's id 
        //use the "result.from" to show user who their new message is from
        //then update last login
        //TODO: customize this
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
            body: JSON.stringify({ id, last_login }),
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
                    setRecentMessages(response)
                    console.log('I am looping, I suck')
                    setNotify(true)
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

            console.log(recentMessages)
            console.log(last_login)
            console.log(notify)
    }

    export default newMessages;
