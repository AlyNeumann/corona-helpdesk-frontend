//this component is a todo list of needs
//with need & quantity, and a button to update or delete
//update-needs will open when clicking the Add button
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Need from './need';
import './needstodo.css';


const NeedsTodo = ({ user, needs }) => {
    // console.log('from needs todo')
    // console.log(needs)


    return (
        <div className="needstodo-container">
            <div className="needstodo-inner">
                <div className="needs-title">{user ? <h2>Update Your Needs List {user.name}</h2> : <h2>Update your needs list!</h2>}</div>
                <div className="needs-label">Item needed     |     Exchange offered     |     Quantity</div>
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
                        <AddBoxIcon />
                    </button>
                </Link>
            </div>
        </div>)
}

export default NeedsTodo;