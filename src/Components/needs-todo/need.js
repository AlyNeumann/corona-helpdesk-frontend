import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './need.css';

//material ui
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const Need = ({ need, needs }) => {

    //material ui
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
        // <div className="need-container">
            <div className="need-inner">
                <div className="paired-need-text">
                    <div className={classes.root}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>
                                    {/* <div className="need-text"> */}
                                    Need: {need.needType}
                                    {/* </div> */}
                                </Typography>
                                <Typography className={classes.heading}>
                                    {/* <div className="need-text"> */}
                                    Exchange: {need.exchangeType}
                                    {/* </div> */}
                                </Typography>
                                <div className="paired-need-text">
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
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className="need-text">
                                    <Typography>
                                        Description: {need.needDescription}
                                    </Typography>
                                </div>
                                <div className="need-text">
                                    <Typography>
                                        Description: {need.exchangeDescription}
                                    </Typography>
                                </div>
                            </ExpansionPanelDetails>

                        </ExpansionPanel>
                    </div>


                </div>
                {/* <div className="paired-need-text">
                    <div className="need-text">Exchange Type: {need.exchangeType}</div>
                    <div className="need-text">Exchange Description: {need.exchangeDescription}</div>
                </div> */}
                {/* <div className="paired-need-text">
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
                </div> */}
                   {errorMessage && <div>{errorMessage}</div>}
            </div>
         
        // </div>
    )
}

export default Need; 