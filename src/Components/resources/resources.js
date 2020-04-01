import React from 'react';
import './resources.css'


//self assement tool, financial resources, health and safety guide
//https://ca.thrive.health/covid19/en

const Resources = () => {

    const handleUrl = (e) => {
      const url = e.target.value;
        window.open(url);
    }
 
    return (
        <div className="resources-container">
             <div className="resources-inner">
                 <h3>Helpful Resources</h3>
                        <h5>Self Assement Tool</h5>
                    <div className="resource">
                        <button 
                        value="https://ca.thrive.health/covid19/en" 
                        onClick={handleUrl}>
                            Resource 1</button>
                    </div>
                    <h5>Financial Assistance</h5>
                    <div className="resource">
                    <button 
                    value="https://www.canada.ca/en/department-finance/economic-response-plan.html?fbclid=IwAR2yH3hmBff0zi-63S6c6ixMHAJHP-xQxRSMXMuUrE0Ub-MFrFDclm2nb3k" 
                    onClick={handleUrl}>
                        Resource 2</button>
                    </div>
                    <h5>Financial Resources for Artists</h5>
                    <div className="resource">
                    <button 
                    value="https://www.yesmontreal.ca/ignitionweb/data/media_centre_files/5752/Client_COVID-19_Support_Resources.pdf?fbclid=IwAR0rTBLIG7_mVTENrcezVZIA9KhGtRE1ERieEWUIcYlAd2hs5X0oRXz4txE" 
                    onClick={handleUrl}>
                        Resource 3</button>
                    </div>
                    <h5>3. Find your local representative</h5>
                    <div className="resource">
                    <button 
                    value="http://m.assnat.qc.ca/fr/deputes/index.html?fbclid=IwAR0M0kAfLpizF1KXL5s5c8XOZoDFNiaSSjcaadca06JMgMLehRMqvwSEQTQ" 
                    onClick={handleUrl}>
                        Resource 3</button>
                    </div>
             </div>
        </div>)
}

export default Resources;