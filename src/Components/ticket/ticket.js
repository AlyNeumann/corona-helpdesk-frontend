import React, { useState } from "react";
import { Button } from "../../global";
import TicketModal from './ticketmodal';
import './ticket.css';

const Ticket = (props) => {
  // report issue modal
  const [modal, setModal] = useState(false);
  //open or close modal
  const [open, setOpen] = React.useState(false);

  //to close modal
  const handleClick = () => {
    setOpen(false);
  };

  //handle button click for forgot password
  const handleOpen = () => {
    setModal(true);
  };

  return (
    <div>
      <Button className="ticket-btn" onClick={handleOpen}>report a bug</Button>
      {modal ? (
        <TicketModal
          open={[open, setOpen]}
          handleClick={handleClick}
          user={props.user}
        />
      ) : null}
    </div>
  );
};

export default Ticket;
