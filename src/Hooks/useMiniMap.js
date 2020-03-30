import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import dotenv from 'dotenv';

const useMiniMap = (id) => {
    dotenv.config();
    const [map, setMap] = useState(null);
    //TODO: change this to coordinate: {lat:, lng:}
    //& send full address for signup & profile update
    const [address, setAddress] = useState(null);
    const [coords, setCoords] = useState({
        lat: '',
        lng: ''
    });

    //bounds of Montreal 
    const bounds = [[-73.839278, 45.423700], [-73.302155, 45.733025]
    ];

    useEffect(() => {

        //mapbox map init pull token from .env file
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


        const map = new mapboxgl.Map({
            container: id,
            style: "mapbox://styles/alymarguerite/ck88s2fvx0hx21jlndc2ekfws",
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
            placeholder: '     Enter your address',
            countries: 'CA',
            marker: false
        })
        map.addControl(geocoder);

        //address chosen for input result
        geocoder.on('result', function (result) {
            console.log(result.result.place_name)
            console.log(result.result.geometry.coordinates[0] + " " + result.result.geometry.coordinates[1])
            setAddress(result.result.place_name)
            setCoords({ ...coords, 
                lat: result.result.geometry.coordinates[1],
                lng: result.result.geometry.coordinates[0]
            })
            // setAddress(result.result);
        })

        map.on("load", () => {
            setMap(map);
        });

    }, []);


    return [map, address, coords];
}

export default useMiniMap;