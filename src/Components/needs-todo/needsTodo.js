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
    <h3 className="needs-title">{user ?<div>Update Your Needs List {user.name}</div>: <div>Update your needs list!</div>}</h3>
        <div className="needs-title">Item needed     |     Exchange offered     |     Quantity</div>
                <ul>
                    {needs.map(need => {
                        return <Need need={need} key={need.quantity} needs={needs}/>
                    })}
                </ul>
                <Link to={{
                        pathname: '/updateneeds',
                        state: {
                            "functionType":"add",
                            need:{need:""},
                            needs
                        }
                    }} >
                <button
                    className="btn btn-secondary">
                    <AddBoxIcon />
                </button>
                </Link>
            </div>
        </div>)
}

export default NeedsTodo;