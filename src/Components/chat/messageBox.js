import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

//material ui styles
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const MessageBox = ({ onSendMessage }) => {

    const [message, setMessage] = useState('')

    const classes = useStyles();

    const handleChange = (e) => {
        const msg = e.target.value
        setMessage(msg)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            onSendMessage({message});
            setMessage('');
        }
    }

    return (
        <div>
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField 
                        id="input-with-icon-grid" 
                        margin="normal" 
                        label="type your message here" 
                        multiline rows="4"
                        fullWidth
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default MessageBox;
