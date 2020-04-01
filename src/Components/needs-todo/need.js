import React from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './need.css';


const Need = ({ need, needs }) => {

    // console.log('from need')
    // console.log(need)

    //handles click of delete button
    const handleRemove = () => {
        //pass the id of the need here 
        //make DELETE call to the API here - no hook needed, super simple eh
        // console.log('remove item')
    }

    return (
        <div className="need-container">
            <div className="need-inner">
                <div className="need-text">Need Type: {need.needType}</div>
                <div className="need-text">Description: {need.needDescription}</div>
                <div className="need-text">Exchange Type: {need.exchangeType}</div>
                <div className="need-text">Exchange Description: {need.exchangeDescription}</div>
                <Link to={{
                    pathname: '/updateneeds',
                    state: {
                        "functionType": "update",
                        need,
                        needs
                    }
                }} >
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