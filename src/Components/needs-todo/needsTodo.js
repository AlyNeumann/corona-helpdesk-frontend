//this component is a todo list of needs
//with need & quantity, and a button to update or delete
//update-needs will open when clicking the Add button
import React from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Need from './need';
import './needstodo.css';

//TODO: swap out the key for ID from back end when getting the real info
//call API here to get the needs list 

const NeedsTodo = () => {
    const needs = [
        { need: "I need this thing", exchange: "money", quantity: 10 },
        { need: "Here is another thing I need",exchange: "mangos", quantity: 2 },
        { need: "Yes, another need indeed!", exchange: "I'll do your taxes!", quantity: 104 }
    ]

    return (
        <div className="needstodo-container">
            <div className="needstodo-inner">
                <h3 className="needs-title">Update Your Needs List</h3>
                <ul>
                    {needs.map(need => {
                        return <Need need={need} key={need.quantity} />
                    })}
                </ul>
                <Link to={{
                        pathname: '/updateneeds',
                        state: {
                            "functionType":"add",
                            need:{need:""}
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