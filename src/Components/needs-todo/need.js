import React from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './need.css';


const Need = ({ need }) => {

     //handles click of delete button
     const handleRemove = () => {
         //pass the id of the need here 
         //make DELETE call to the API here - no hook needed, super simple eh
        console.log('remove item')
    }

    return (
        <div className="need-container">
            <div className="need-inner">
                <div className="need-text">{need.need}</div>
                <div className="need-text">{need.exchange}</div>
                <div>Quantity: {need.quantity}</div>
                <Link to={{
                    pathname: '/updateneeds',
                    state: {
                        need,
                        functionType:"update"
                            
                    }
                }}>
                    <button
                        className="btn-needs btn-secondary">
                        <EditIcon />
                    </button>
                </Link>
                <button 
                className="btn-needs btn-secondary"
                onClick={handleRemove}>
                    <DeleteForeverIcon />
                    </button>
            </div>
        </div>
    )
}

export default Need; 