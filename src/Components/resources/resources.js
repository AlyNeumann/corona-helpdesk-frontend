import React from 'react';
import { Button } from '../../global';
import { useSpring, animated } from 'react-spring';
import './resources.css'



//TODO: bring in chain animation from react spring

const Resources = () => {
    //react spring
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        marginTop: 1,
        from: { marginTop: 500 },
    });

    const handleUrl = (e) => {
        const url = e.target.value;
        window.open(url);
    }

    return (
        <animated.div style={props}>
        <div className="resources-container">
            <div className="resources-inner">
                <h2>Helpful Resources</h2>
                <h5>Self Assement Tool</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text"
                        value="https://ca.thrive.health/covid19/en"
                        onClick={handleUrl}>
                        Resource 1</Button>
                </div>
                <h5>Financial Assistance</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text"
                        value="https://www.canada.ca/en/department-finance/economic-response-plan.html?fbclid=IwAR2yH3hmBff0zi-63S6c6ixMHAJHP-xQxRSMXMuUrE0Ub-MFrFDclm2nb3k"
                        onClick={handleUrl}>
                        Resource 2</Button>
                </div>
                <h5>Financial Resources for Artists</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text"
                        value="https://www.yesmontreal.ca/ignitionweb/data/media_centre_files/5752/Client_COVID-19_Support_Resources.pdf?fbclid=IwAR0rTBLIG7_mVTENrcezVZIA9KhGtRE1ERieEWUIcYlAd2hs5X0oRXz4txE"
                        onClick={handleUrl}>
                        Resource 3</Button>
                </div>
                <h5>Find your local representative</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text"
                        value="http://m.assnat.qc.ca/fr/deputes/index.html?fbclid=IwAR0M0kAfLpizF1KXL5s5c8XOZoDFNiaSSjcaadca06JMgMLehRMqvwSEQTQ"
                        onClick={handleUrl}>
                        Resource 4</Button>
                </div>
            </div>
        </div>
        </animated.div>)
}

export default Resources;