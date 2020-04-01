import React, { useEffect, useState, useContext } from 'react';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from '../marker/marker';
import Popup from '../popup/popup';
import useMap from '../../Hooks/useMap';
import useGeoJson from '../../Hooks/useGeoJson';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { UserContext } from '../user-context/userContext';
import DirectionsIcon from '@material-ui/icons/Directions';
import './map.css';
//TODO: bring in user info for popup
//TODO: create hashmap for health statuses to use here & on profile



const Map = () => {
  //TODO: bring user in from Context 

  const [map, coordinates, accessToken] = useMap("mapbox")
  // const [geocodes] = useGeoJson();
  const [healthType, setHealthType] = useState({ status: "no health status" })
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [textDirections, setTextDirections] = useState(true)
  const user = useContext(UserContext);
  const userInfo = user[0];


  //TODO: api call here for all user data

  //mock data to be removed 
  const mockdata = [
    {
      "user_id": "1234",
      "needs": [{
        "need": "what i need",
        "quantity": 10,
        "exchange": "some mangoes"
      }],
      "location": {
        "coords": {
          "lat": -73.556300, "lng": 45.519500
        },
        "address": "145 rue st"
      },
      "healthStatus": 1
    },
    {
      "user_id": "4321",
      "needs": {
        "need": "a thing i need",
        "quantity": 4,
        "exchange": "cash money"
      },
      "location": {
        "coords": {
          "lat": 45.520600, "lng": -73.560250
        },
        "address": "145 rue st"
      },
      "healthStatus": 1
    },
    {
      "user_id": "5678",
      "needs": {
        "need": "what i need",
        "quantity": 10,
        "exchange": "some mangoes"
      },
      "location": {
        "coords": {
          "lat": 45.518590, "lng": -73.558300
        },
        "address": "145 rue st"
      },
      "healthStatus": 2
    },
    {
      "user_id": "8765",
      "needs": {
        "need": "a thing i need",
        "quantity": 4,
        "exchange": "cash money"
      },
      "location": {
        "coords": {
          "lat": 45.530600, "lng": -73.550250
        },
        "address": "145 rue st"
      },
      "healthStatus": 2
    }
  ]



  //hashmap for health statuses
  const addMarkers = (map, mockdata, type) => {
    const healthOptions = {
      "1": "Healthy",
      "2": "Sick",
      "3": "Immune Compromised/Elderly",
      "4": "Diagnosed/Quarantined",
      "5": "Unsure"
    }
    //add a marker for each user using lat & long & taking in colour type
    mockdata.forEach(data => {
      data.healthStatus = healthOptions[data.healthStatus]
      let coords = [data.location.coords.lng, data.location.coords.lat];
      const marker_el = Marker(map, coords, type).getElement();
      //popup on each marker

      addPopup(map, marker_el, data);
    });
  };

  //add a popup to each marker, with directions options
  const addPopup = (map, marker_el, data) => {


    //html inside of popup with buttons for choosing direction method
    const html = (
      <div className="popup">
        {/* <div
              className="popupCover"
              style={{ backgroundImage: "url(" + data.photoUrl + ")" }}
            ></div> */}
        <div className="title">{data.user_id}</div>
        <div className="popup-description">Needs : {data.needs.need}</div>
        <div className="popup-description">Location : {data.address}</div>
        <div className="popup-description">HealthStatus: {data.healthStatus}</div>

      </div>
    );

    //render popup html content first
    const renderedPopup = document.createElement("div");
    ReactDom.render(html, renderedPopup);

    //added popup
    const popup = new Popup();
    popup
      .getPopup()
      .setDOMContent(renderedPopup)
      .setLngLat([data.location.coords.lng, data.location.coords.lat])
      .setMaxWidth("250px")
      .addTo(map);

    //hide popup at begining
    popup.getElement().style.display = "none";

    //show popup on marker & popup hover

    marker_el.addEventListener("mouseenter", event => {
      popup.getElement().style.display = "";
    });
    marker_el.addEventListener("mouseleave", event => {
      popup.getElement().style.display = "none";
    });
    popup.getElement().addEventListener("mouseenter", event => {
      popup.getElement().style.display = "";
    });
    popup.getElement().addEventListener("mouseleave", event => {
      popup.getElement().style.display = "none";
    });
  };

  //add directions box
  const directions = new MapboxDirections({
    accessToken: accessToken,
    unit: 'metric',
    profile: 'mapbox/cycling',
    alternatives: true,
    congestion: true,
    placeholderOrigin: 'Your location',
    placeholderDestination: 'Click on you destination',
    controls: { instructions: true }
    //add style sheet to customize the directions
    // styles: style,


  });


  useEffect(() => {
    if (coordinates && map) {
      let lng = coordinates.lng;
      let lat = coordinates.lat;
      directions.setOrigin([lng, lat]);
      // map.addControl(directions, 'bottom-right');
    }
  }, [coordinates])

  const handleDirections = () => {
    if (directions && map && coordinates) {
      map.addControl(directions, 'top-right');
      setDirectionsOpen(true)
      setTextDirections(true)
    }
  }

  //TODO: fix this, either clear destination or remove controls
  const handleCloseDirections = () => {
    if(textDirections){
      setTextDirections(false)
      directions.actions.clearDestination();
    }else{
      setTextDirections(true)
    }

  }



  //to add Markers based on health status
  useEffect(() => {
    //filter through array and divide by health status
    const greenArray = mockdata.filter(function (el) {
      return el.healthStatus === 1
    });
    const redArray = mockdata.filter(function (el) {
      return el.healthStatus === 2
    });
    const yellowArray = mockdata.filter(function (el) {
      return el.healthStatus === 3 || el.healthStatus === 4 || el.healthStatus === 5
    });

    //add markers based on filter
    if (mockdata && map) {
      let type = "green"
      addMarkers(map, greenArray, type);
    }
    if (mockdata && map) {
      let type = "red"
      addMarkers(map, redArray, type);
    }
    if (mockdata && map) {
      let type = "yellow"
      addMarkers(map, yellowArray, type);
    }

  }, [map, mockdata]);



  return (
    <div id="mapbox">
      {!directionsOpen ?   <div className="mapboxgl-ctrl-top-left">
        <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
          <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-fullscreen"
            aria-label="Toggle fullscreen"
            type="button"
            onClick={handleDirections}><DirectionsIcon /></button>
        </div>
      </div> : null}
    
      {directionsOpen ?
        <div className="mapboxgl-ctrl-top-left">
          <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
            <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-fullscreen"
              aria-label="Toggle fullscreen"
              type="button"
              onClick={handleCloseDirections}><DirectionsIcon /></button>
          </div>
        </div>
        : null}

      {/* <button className="directions-btn btn-primary">DIRECTIONS</button> */}
    </div>
  )
}

export default Map;