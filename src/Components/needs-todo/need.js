import React, { useState, useEffect } from 'react';
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
        flexBasis: '10%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    thirdHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        left: "35%",
        marginRight: "-65%",
        position: "absolute"
    }
}));


const Need = ({ need, needs }) => {

    //material ui
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [needType, setNeedType] = useState(null);
    const [exchangeType, setExchangeType] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [deleted, setDeleted] = useState(false);

    //hashmap for need types
    const needOptions = {
        "1": "Item",
        "2": "Errand",
        "3": "Repair",
        "4": "Service",
        "5": "Nothing",
    }

    //hashmap for exchange types
    const exchangeOptions = {
        "1": "Cash",
        "2": "Money Transfer",
        "3": "Trade",
        "4": "Skill",
        "5": "Nothing"
    }

    const getTextOptions = (need) => {
        setNeedType(needOptions[need.needType])
        setExchangeType(exchangeOptions[need.exchangeType])
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getTextOptions(need)
    }, [need])


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

        const refreshPage = () => {
            window.location.reload(false);
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
                refreshPage();
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
                            <div>
                            <Typography className={classes.heading}>
                                Need:
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {needType}
                            </Typography>
                            </div>
                            <div className="need-phoneview">
                            <Typography className={`${classes.heading} typetexttwo`}>
                                Exchange:
                            </Typography>
                            <Typography className={classes.thirdHeading}>
                                {exchangeType}
                            </Typography>
                            </div>
                            <div className="paired-button-text">
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
                                        <EditIcon className="buttonclass" />
                                    </button>
                                </Link>
                                <button
                                    className="btn-needs btn-secondary btn-text"
                                    onClick={handleRemove}>
                                    <DeleteForeverIcon className="buttonclass" />
                                </button>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="need-text">
                                <Typography>
                                    {need.needDescription}
                                </Typography>
                            </div>
                            <div className="need-text">
                                <Typography>
                                    {need.exchangeDescription}
                                </Typography>
                            </div>
                        </ExpansionPanelDetails>

                    </ExpansionPanel>
                </div>


            </div>
  
            {errorMessage && <div>{errorMessage}</div>}
        </div>

      
    )
}

export default Need; 