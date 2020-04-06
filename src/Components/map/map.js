import React, { useEffect, useState, useContext } from 'react';
import useNeedsFeed from '../../Hooks/useNeedsFeed';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from '../marker/marker';
import Popup from '../popup/popup';
import useMap from '../../Hooks/useMap';
import useGeoJson from '../../Hooks/useGeoJson';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { UserContext } from '../user-context/userContext';
import DirectionsIcon from '@material-ui/icons/Directions';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './map.css';
//TODO: bring in user info for popup
//TODO: create hashmap for health statuses to use here & on profile



const Map = () => {


  const [map, coordinates, accessToken] = useMap("mapbox")
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [textDirections, setTextDirections] = useState(true)
  //bring user in from Context 
  const user = useContext(UserContext);
  const userInfo = user[0];


  //api call here for all user data
  const { needsFeed } = useNeedsFeed(userInfo)
  console.log(needsFeed)

  // //when button on popup is clicked, go to user's profile
  // const handlePopupClick = (e) => {
  //   //go to profile of this person
  //   console.log(e)
  //   console.log(e.target.value)
  // }


  //hashmap for health statuses
  const addMarkers = (map, needsFeed, type) => {
    const healthOptions = {
      "1": "Healthy",
      "2": "Symptoms, Immune Compomised, or Elderly",
      "3": "Diagnosed/Quarantined"
    }
    //add a marker for each user using lat & long & taking in colour type
    needsFeed.forEach(data => {
      data.healthStatus = healthOptions[data.healthStatus]
      let coords = [data.houseLocation.coordinates[1], data.houseLocation.coordinates[0]];
      const marker_el = Marker(map, coords, type).getElement();
      //popup on each marker

      addPopup(map, marker_el, data);
    });
  };

  //add a popup to each marker, with directions options
  const addPopup = (map, marker_el, data) => {

    //when button on popup is clicked, go to user's profile
    const handlePopupClick = () => {
      //go to profile of this person
     console.log(data._id)
    }

    //html inside of popup with buttons for choosing direction method
    const html = (
      <div className="popup">
        <div className="popup-profile">
          <div className="title">{data.name}</div>
          {/* TODO - link to profile of this user with this button*/}
          <button
            className="btn-needs btn-secondary btn-text mapboxpopup-btn"
            // value={data._id}
            //e => this.handleInput(e, "value")
            onClick={handlePopupClick}>
            <AccountCircleIcon />
          </button>
        </div>

        <div className="popup-description">
          <div className="popuptitle">Needs : </div>
          {data.neededList.map(need => {
            return (<div>{need.needDescription}</div>)
          })}</div>

        <div className="popup-description">
          <div className="popuptitle">HealthStatus:  </div>
          {data.healthStatus}</div>

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
      .setLngLat([data.houseLocation.coordinates[1], data.houseLocation.coordinates[0]])
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
    if (textDirections) {
      setTextDirections(false)
      directions.actions.clearDestination();
    } else {
      setTextDirections(true)
    }

  }



  //to add Markers based on health status
  useEffect(() => {
    //filter through array and divide by health status
    const greenArray = needsFeed.filter(function (el) {
      return el.healthStatus === 1
    });
    const redArray = needsFeed.filter(function (el) {
      return el.healthStatus === 2
    });
    const yellowArray = needsFeed.filter(function (el) {
      return el.healthStatus === 3
    });

    //add markers based on filter
    if (needsFeed && map) {
      let type = "green"
      addMarkers(map, greenArray, type);
    }
    if (needsFeed && map) {
      let type = "red"
      addMarkers(map, redArray, type);
    }
    if (needsFeed && map) {
      let type = "yellow"
      addMarkers(map, yellowArray, type);
    }

  }, [map, needsFeed]);



  return (
    <div id="mapbox">
      {!directionsOpen ? <div className="mapboxgl-ctrl-top-left">
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