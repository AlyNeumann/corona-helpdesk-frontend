import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import dotenv from 'dotenv';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import osrmTextInstructions from 'osrm-text-instructions';


const useMap = (id) => {
  dotenv.config();
  const [map, setMap] = useState(null);
  //if user denies eneabling location
  const [geoDenied, setGeoDenied] = useState(false);

  // const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);


  //bounds of Montreal 
  // const bounds = [[-73.839278, 45.423700], [-73.302155, 45.733025]
  // ];

  const getUserOrigin = (directions,coordinates) => {
    console.log('in get origin')
    if(coordinates){
      let lat = coordinates.lat
      let lgn = coordinates.lgn;
      console.log('in the if statement')
      console.log(coordinates)
      directions.setOrigin([lgn, lat]);
    }
  }

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
      geolocate.trigger();
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


    //Geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true, timeout: true },
      trackUserLocation: true
    });
    map.addControl(geolocate, "bottom-right");
       //error event on geolocate
       geolocate.on("error", err => {
        if (err.code === 1) setGeoDenied(true);
      });
  
      //watch on geolocation position change
      geolocate.on("geolocate", pos => {
        console.log(pos)
        console.log(pos.coords.latitude,pos.coords.longitude)
        setCoordinates({
          ...coordinates,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        return getUserOrigin(directions,coordinates)
      })

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
      interactive: true,
      // compile: osrm(),
      interactive: false,
      placeholderOrigin: 'Enable your location',
      placeholderDestination: 'Click on a desitation'
      //add style sheet to customize the directions
      // styles: style,
    });

    // add to your mapboxgl map
    map.addControl(directions, 'bottom-left');

    // if(coordinates){
    //   getUserOrigin(coordinates)
    // }

    //TODO: this isnt working
    
    
    // getUserOrigin(directions,coordinates);
    // setUserOrigin(coords)
   


  }, []);


  // useEffect(() => {
  //   if(coordinates){
  //     getUserOrigin(coordinates)
  //   }
     

  // }, [coordinates])

  return [map, coordinates];
}

export default useMap;