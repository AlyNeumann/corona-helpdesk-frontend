import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './chat.css';

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
        <form className="form chat-form">
            <textarea rows="3"
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyDown}>
        </textarea>
      </form>
    )
}
export default MessageBox;
