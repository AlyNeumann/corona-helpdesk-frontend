import React from 'react';
import useMap from '../../Hooks/useMap';
import './map.css';


const Map = () => {

    const [map] = useMap("mapbox")
 
    return(
        <div id="mapbox">

        </div>
    )
}

export default Map;