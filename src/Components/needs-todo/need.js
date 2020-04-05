import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Cookies from 'js-cookie';
import './need.css';


const Need = ({ need, needs }) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [deleted, setDeleted] = useState(false);

    let history = useHistory();

    //handles click of delete button
    const handleRemove = () => {
        const id = {
            _id: need._id
        }
        const url = "http://localhost:5000/deleteNeed";
        const token = Cookies.get("token");

        const handleErrors = (error) => {
            if (error) {
                setErrorMessage(error);
            }
            return error;
        }


        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json)
            .then(response => {
                console.log(response);
                setDeleted(true);
            })
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })

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
                        className="btn-needs btn-secondary btn-text">
                        <EditIcon />
                    </button>
                </Link>
                <button
                    className="btn-needs btn-secondary btn-text"
                    onClick={handleRemove}>
                    <DeleteForeverIcon />
                </button>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Need; 