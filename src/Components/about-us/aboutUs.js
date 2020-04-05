import React from 'react';
import Vrush from './vrush';
import Aly from './aly';
import './aboutUs.css';

const AboutUs = () => {
    return(
        <div className="aboutus-container">
            {/* <div className="aboutus-inner"> */}
            <Vrush />
            <Aly />
            {/* </div> */}
        </div>
    )

}




export default AboutUs;