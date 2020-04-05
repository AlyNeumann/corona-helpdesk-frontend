import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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


const SingleNeed = ({ need }) => {

    // //hashmap for need types
    // const needOptions = {
    //     "1": "Healthy",
    //     "2": "Sick",
    //     "3": "Immune Compromised/Elderly",
    //     "4": "Diagnosed/Quarantined",
    //   }

    //   //hashmap for exchange types
    // const exchangeOptions = {
    //     "1": "Healthy",
    //     "2": "Sick",
    //     "3": "Immune Compromised/Elderly",
    //     "4": "Diagnosed/Quarantined",
    //   }

    //material ui
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


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
                                    Need: {need.needType}
                                    {/* </div> */}
                                </Typography>
                                <Typography className={classes.heading}>
                                    {/* <div className="need-text"> */}
                                    Exchange: {need.exchangeType}
                                    {/* </div> */}
                                </Typography>
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
    )
}

export default SingleNeed; 