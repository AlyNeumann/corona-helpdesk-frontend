import React from 'react';
import SingleNeed from '../needs-todo/need';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NeedsList = ({ user }) => {
    console.log(user)
    const needs = user.neededList;

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
                        className="btn-needs btn-secondary">
                        <AccountCircleIcon />
                    </button>
                </Link>
                <div className="need-text">Name: {user.name}</div>
                <ul>
                    {needs.map(need => {
                        return <SingleNeed need={need} key={need._id}/>
                    })}
                </ul>
            

            </div>
        </div>
    )
}

export default NeedsList; 