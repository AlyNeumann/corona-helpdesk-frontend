import React from 'react';
import Vrush from './vrush';
import Aly from './aly';
import Ticket from '../ticket/ticket';
import './aboutUs.css';

const AboutUs = () => {

    return (
        <div className="aboutus-container">
            <div className="card">
                <Aly />
                </div>
            <div className="card">
                <Vrush />
                </div>
                <div className="ticket">
                <Ticket/>
                </div>
        </div>
    )

}




export default AboutUs;