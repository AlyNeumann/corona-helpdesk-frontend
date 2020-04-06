import React from 'react';
import SingleNeed from './singleneed';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
                    //link to profile of user!
                    // pathname: '/updateneeds',
                    // state: {
                    //     "functionType": "update",
                    //     need,
                    //     needs
                    // }
                }} >
                    <button
                        className="btn-needs btn-secondary btn-text"
                        // value={user._id}
                        onClick={handleClick}>
                        <AccountCircleIcon className="buttonclass"/>
                    </button>
                </Link>
                <div className="need-text">Name: {user.name}</div>
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