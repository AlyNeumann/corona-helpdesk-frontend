import React, { useState } from 'react';
import { Button } from '../../global';
import './terms.css';

const Terms = () => {

    const [openDetails, setOpenDetails] = useState(false);
    const handleClick = () => {
        if(!openDetails){
            setOpenDetails(true)
        }else{
            setOpenDetails(false);
        }
       
    }


    return (
        <div className="terms-container">
            {openDetails ? (<div>
                <h5 className="terms-title">Project Details</h5>
                <div>
                    <p className="terms-text">
                        Welcome to Covid 19 Commuty Help!
                        This app was built to connect people who need help with people near them who want to help.
                        This app will ask some personal info, like your location and health status,
                        but even if you lie about those, you can still totally use the app.
                        The health status will be used to colour code a marker that will represent your approximate location on a map.
                        Your address will never be shared.

                        This project was built with no profits in mind.
                        If the project is useful, then there will be some server costs but for now it can run for (almost) free.
                        If that happens, I will crowd fund or apply for grants.
                        I will never sell data for profit.
                        I am a very new web developer and I just was trying to find a way to help folks right now, while testing my new skills.
                        I am immune compromised so that is how I came up with this idea.
                        There are bound to be many bugs so please email any issues you have to neumannbooking@gmail.com .
                        I hope you find it useful!
            </p>
            <Button
                onClick={handleClick}
                className="fancy-btn-text"
                >Close</Button>
                </div>
            </div>) :
                <button
                className="modal-button"
                onClick={handleClick}
                >What is this project?</button>
            }

        </div>)

}

export default Terms;