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
        <animated.div className="resources" style={props}>
        <div className="resources-container">
            <div className="resources-inner">
                <h2>Helpful Resources</h2>
                <h5>Self Assement Tools</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://ca.thrive.health/covid19/en"
                        onClick={handleUrl}>
                        Self Assessement Tool Canada</Button>
                </div>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://flatten.ca/?lang=fr#home"
                        onClick={handleUrl}>
                        Self Assessement Tool Quebec</Button>
                </div>
                <h5>Financial Assistance</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://www.canada.ca/en/department-finance/economic-response-plan.html?fbclid=IwAR2yH3hmBff0zi-63S6c6ixMHAJHP-xQxRSMXMuUrE0Ub-MFrFDclm2nb3k"
                        onClick={handleUrl}>
                        Financial Options Canada</Button>
                </div>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://www.canada.ca/en/services/benefits/ei/cerb-application.html"
                        onClick={handleUrl}>
                        Info on the CERB</Button>
                </div>
                <h5>Resources for Artists</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://www.yesmontreal.ca/ignitionweb/data/media_centre_files/5752/Client_COVID-19_Support_Resources.pdf?fbclid=IwAR0rTBLIG7_mVTENrcezVZIA9KhGtRE1ERieEWUIcYlAd2hs5X0oRXz4txE"
                        onClick={handleUrl}>
                        Financial Options</Button>
                </div>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://docs.google.com/document/d/1YlE5KbmM8VP6bHlKQ5YvuMtxKQPwFfXL3DMuz0wdguU/edit?fbclid=IwAR1KDNY4dQkoIjnVbYvmloGf30L37lqyfJhI6h2N-3303NdHoQYXm4foFmg"
                        onClick={handleUrl}>
                        CERB and Live Streaming</Button>
                </div>
                <h5>Find your local representative</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="http://m.assnat.qc.ca/fr/deputes/index.html?fbclid=IwAR0M0kAfLpizF1KXL5s5c8XOZoDFNiaSSjcaadca06JMgMLehRMqvwSEQTQ"
                        onClick={handleUrl}>
                        Find my MP Quebec</Button>
                </div>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://www.ourcommons.ca/members/en/search"
                        onClick={handleUrl}>
                        Find my MP Canada</Button>
                </div>
                <h5>Wait times at grocery stores & Montreal resources</h5>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://docs.google.com/document/d/1PgbUR1gT1PKIDPJFuWXhqieFLY7TAxxl4r_9dsaB05w/edit?fbclid=IwAR3ijjj41EAJz6Fa_T6BD04CKKlyF480fmn8twTW8T5LPMyxQP2yVYJH5uM"
                        onClick={handleUrl}>
                        Montreal Resources</Button>
                </div>
                <div className="resource">
                    <Button
                        className="btn btn-seconday btn-text fancy-btn-text"
                        value="https://covid19-waiting-time.thejoin.tech/"
                        onClick={handleUrl}>
                        Grocery store wait times</Button>
                </div>
            </div>
          
        </div>
        <div className="bug-find">Find a bug or have a resource to add? Send an email to neumannbooking@gmail.com!</div>
        </animated.div>)
}

export default Resources;


