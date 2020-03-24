import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import dotenv from 'dotenv';

const useMiniMap = (id) => {
    dotenv.config();
    const [map, setMap] = useState(null);
    const [address, setAddress] = useState(null);

    //bounds of Montreal 
    const bounds = [[-73.839278, 45.423700], [-73.302155, 45.733025]
    ];

    useEffect(() => {

        //mapbox map init pull token from .env file
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


        const map = new mapboxgl.Map({
            container: id,
            style: "mapbox://styles/alymarguerite/ck85xpaul0lm11iqe98gm0cgz",
            center: [-73.567253, 45.501690],
            zoom: 17,
            bearing: -12,
            antialias: true
        });

        //load map bounds (Montreal)
        map.fitBounds(
            bounds
        );

        //geocoder
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: 'Enter your address',
            countries: 'CA',
            marker: false
        })
        map.addControl(geocoder);

        //auto complete results
        geocoder.on('results', function(results) {
            console.log(results);
         })
         //address chosen for input result
         geocoder.on('result', function(result) {
            console.log(result);
            console.log(result.result.center);
            setAddress(result.result.center);
         })

        map.on("load", () => {
            setMap(map);
        });

    }, []);


    return [map, address];
}

export default useMiniMap;