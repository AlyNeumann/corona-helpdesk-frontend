import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../needs-todo/need.css';

//material ui
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const SingleNeed = ({ need }) => {

    const [needType, setNeedType] = useState(null);
    const [exchangeType, setExchangeType] = useState(null);

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


    //material ui
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getTextOptions(need)
    }, [need])

    return (
        <div>
              <div className={classes.root}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>
                                    {/* <div className="need-text"> */}
                                    <p className="needlist-title">  Need: </p>{needType}
                                    {/* </div> */}
                                </Typography>
                                <Typography className={`${classes.heading} typetext`}>
                                    {/* <div className="need-text"> */}
                                    <p className="needlist-title">Exchange: </p>{exchangeType}
                                    {/* </div> */}
                                </Typography>
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
    )
}

export default SingleNeed; 