import React from 'react';
import SingleNeed from './singleneed';
import { Link } from 'react-router-dom';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import './needslist.css'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NeedsList = ({ user }) => {
    // console.log(user)
    const needs = user.neededList; 
    const id = user._id

    const handleClick = () => {
        //go to the page of that user they clicked on
        console.log(id)
    }

    return (
        <div >
            <div className="need-inner">
            <Link to={{
                    // link to profile of user!
                    pathname: '/profileview',
                    state: {
                        user
                    }
                }} >
                    <button
                        // className="btn-needs btn-secondary btn-text"
                        // value={user._id}
                        onClick={handleClick}>
                            <img className="button-img" src={user.photoUrl? user.photoUrl : PortraitPlaceholder}/>
                        {/* <AccountCircleIcon className="buttonclass"/> */}
                    </button>
                </Link>
                <div className="need-text">{user.name}</div>
                <ul className="needslist-container">
                    {needs.map(need => {
                        return <SingleNeed need={need} key={need._id}/>
                    })}
                </ul>
            

            </div>
        </div>
    )
}

export default NeedsList; 