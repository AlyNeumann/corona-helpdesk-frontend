//this component is a todo list of needs
//with need & quantity, and a button to update or delete
//update-needs will open when clicking the Add button
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Need from './need';
import './needstodo.css';


const NeedsTodo = ({ user, needs }) => {



    return (
        <div className="needstodo-container">
            <div className="needstodo-inner">
                <div className="needs-title"><h2>Update Your Needs List</h2></div>
                <div className="needs-label">What I need      |     What I can exchange</div>
                <ul className="needs-ul">
                    {needs.map(need => {
                        return <Need need={need} key={need._id} needs={needs}/>
                    })}
                </ul>
                <Link to={{
                    pathname: '/addneeds',
                    state: {
                        "functionType": "add",
                        need: { need: "" },
                        needs
                    }
                }} >
                    <button
                        className="btn btn-secondary btn-text">
                        <AddBoxIcon className="buttonclass"/>
                    </button>
                </Link>
            </div>
        </div>)
}

export default NeedsTodo;