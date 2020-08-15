import React, { useState } from 'react';
import SingleNeed from './singleneed';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import StarsIcon from '@material-ui/icons/Stars';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import './needslist.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { PublicTwoTone } from '@material-ui/icons';

const NeedsList = ({ user }) => {

    const needs = user.neededList;
    //id of the user in the feed, not the current user!
    const id = user._id
    console.log(id)
    const userImg = user.img;
    const [errorMessage, setErrorMessage] = useState();

    const upvote = () => {
        const url = 'http://localhost:5000/getUpdateUpvotes'
        const token = Cookies.get("token");

        //handle error messages
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            else return response
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({ id }),
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
                    console.log('reponse from update upvote');
                    console.log(response)
                }

            })

    }

    //TODO: function for updating upvotes 
    const handleUpvote = () => {
        console.log('upvote button being clicked')
        upvote();
    }

    return (
        <div >
            <div className="needslist-inner">
                <div className="needslist-avatar">
                    <Link to={{
                        // link to profile of user!
                        pathname: '/profileview',
                        state: {
                            user
                        }
                    }} >
                        <button
                            className="btn-img"
                        // value={user._id}
                        // onClick={handleClick}
                        >

                            {userImg ? <img className="btn-image" src={`data:image/jpeg;base64,${userImg}`} /> : <img className="btn-image" src={PortraitPlaceholder} />}
                        </button>
                    </Link>
                    <h5 className="title-name">{user.name}</h5>
                    <Tooltip TransitionComponent={Zoom} title="Upvote">
                        <button className="upvote" onClick={handleUpvote}>
                            <StarsIcon className="iconclass" />
                        </button>
                    </Tooltip>
                </div>
                <ul className="needsfeedlist-container">
                    {needs.map(need => {
                        return <SingleNeed need={need} key={need._id} />
                    })}
                </ul>


            </div>
        </div>
    )
}

export default NeedsList; 