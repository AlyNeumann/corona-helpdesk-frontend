import React from 'react';
import SingleNeed from './singleneed';
import { Link } from 'react-router-dom';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import './needslist.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NeedsList = ({ user }) => {
    // console.log(user)
    const needs = user.neededList; 
    const id = user._id
    // const data = user.img;

//TODO: add photo to each user

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
                            
                            {/* {user ?  <img className="btn-img" src={`data:image/jpeg;base64,${data}`} /> : <img className="btn-img" src={PortraitPlaceholder} />} */}
                        <AccountCircleIcon className="buttonclass"/>
                    </button>
                </Link>
                <h5 className="title-name">{user.name}</h5>
                </div>
                <ul className="needsfeedlist-container">
                    {needs.map(need => {
                        return <SingleNeed need={need} key={need._id}/>
                    })}
                </ul>
            

            </div>
        </div>
    )
}

export default NeedsList; 