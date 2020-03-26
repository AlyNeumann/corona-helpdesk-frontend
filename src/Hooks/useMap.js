import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import dotenv from 'dotenv';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


const useMap = (id) => {
  dotenv.config();
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(null);

  //bounds of Montreal 
  // const bounds = [[-73.839278, 45.423700], [-73.302155, 45.733025]
  // ];

  useEffect(() => {

    //mapbox map init pull token from .env file
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


    const map = new mapboxgl.Map({
      container: id,
      style: "mapbox://styles/alymarguerite/ck88s2fvx0hx21jlndc2ekfws",
      center: [-73.567253, 45.501690],
      zoom: 15,
      bearing: -12,
      antialias: true,
      // pitch: 60
    });

    //set map
    map.on("load", () => {
      setMap(map);
    });

    //load map bounds (Montreal)
    // map.fitBounds(
    //     bounds
    // );

    map.touchZoomRotate.enable({ around: 'center' });
    map.touchZoomRotate.enableRotation();
    map.scrollZoom.enable();
    map.dragRotate.enable();
    map.dragPan.enable();


    //controls map like video game 
    //using arrow keys to navigate 
    //pixels the map pans when the up or down arrow is clicked
    const deltaDistance = 100;

    // degrees the map rotates when the left or right arrow is clicked
    const deltaDegrees = 25;

    function easing(t) {
      return t * (2 - t);
    }

    map.on('load', function () {
      map.getCanvas().focus();

      map.getCanvas().addEventListener(
        'keydown',
        function (e) {
          // e.preventDefault();
          if (e.which === 38) {
            // up
            map.panBy([0, -deltaDistance], {
              easing: easing
            });
          } else if (e.which === 40) {
            // down
            map.panBy([0, deltaDistance], {
              easing: easing
            });
          } else if (e.which === 37) {
            // left
            map.easeTo({
              bearing: map.getBearing() - deltaDegrees,
              easing: easing
            });
          } else if (e.which === 39) {
            // right
            map.easeTo({
              bearing: map.getBearing() + deltaDegrees,
              easing: easing
            });
          }
        },
        true
      );
    });


    //geocoder
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   placeholder: '      Enter your destination',
    //   countries: 'CA',
    //   marker: false
    // })
    // map.addControl(geocoder, 'bottom-right');

    // //auto complete results
    // geocoder.on('results', function (results) {
    //   console.log(results);
    // })
    // //address chosen for input result
    // geocoder.on('result', function (result) {
    //   console.log(result);
    //   console.log(result.result.center);
    //   setAddress(result.result.center);
    // })



    //Geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true, timeout: true },
      trackUserLocation: true
    });
    map.addControl(geolocate, "bottom-right");

    // Navigation control
    const navcontrol = new mapboxgl.NavigationControl({
      showZoom: true,
      // visualizePitch: true
    });
    map.addControl(navcontrol, "bottom-right");

    //mapbox directions 
    // const MapboxDirections = require('../src/index');
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
      alternatives: true,
      congestion: true,
      //add style sheet to customize the directions
      // styles: style,
      // placeholderOrigin: 'Hey hey hey'
      // placeholderDestination: ''
    });
    // add to your mapboxgl map
    map.addControl(directions, 'bottom-right');


  }, []);


  return [map, address];
}

export default useMap;