import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import dotenv from 'dotenv';
// import osrmTextInstructions from 'osrm-text-instructions';


const useMap = (id) => {
  dotenv.config();
  const [map, setMap] = useState(null);
  //if user denies eneabling location
  const [geoDenied, setGeoDenied] = useState(false);

  // const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);


    //mapbox map init pull token from .env file
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const accessToken = mapboxgl.accessToken;


    useEffect(() => {


    const map = new mapboxgl.Map({
      container: id,
      style: "mapbox://styles/alymarguerite/ck8qb354p01z01iqvhdqg9b5l",
      // style: "mapbox://styles/alymarguerite/ck88s2fvx0hx21jlndc2ekfws",
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
        // console.log(pos)
        // console.log(pos.coords.latitude,pos.coords.longitude)
        setCoordinates({
          ...coordinates,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      })

    // Navigation control
    // const navcontrol = new mapboxgl.NavigationControl({
    //   showZoom: true,
    //   // visualizePitch: true
    // });
    // map.addControl(navcontrol, "bottom-right");




  }, []);


  return [map, coordinates,accessToken];
}

export default useMap;