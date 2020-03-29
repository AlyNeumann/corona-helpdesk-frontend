import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from '../marker/marker';
import Popup from '../popup/popup';
import useMap from '../../Hooks/useMap';
import useGeoJson from '../../Hooks/useGeoJson';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import './map.css';
//TODO: bring in user info for popup
//TODO: create hashmap for health statuses to use here & on profile



const Map = () => {

    const [map, coordinates] = useMap("mapbox")
    const [geocodes] = useGeoJson();
    const [healthType, setHealthType] = useState({ status: "no health status"})

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
                    "lat": 45.519500, "lng": -73.556300
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
    
  //function to assign health status
//   const checkHealthOption = (id) => {
//     setHealthType({ status: healthOptions[id]})
// }



        //add a marker for each user using lat & long & taking in colour type
    
        const addMarkers = (map, mockdata, type) => {
          const healthOptions = {
            "1": "Healthy",
            "2": "Sick",
            "3": "Immune Compromised/Elderly",
            "4": "Diagnosed/Quarantined",
            "5": "Unsure"
        }

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

    //       //mapbox map init pull token from .env file
    // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


    //   const directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric',
    //     profile: 'mapbox/cycling',
    //     alternatives: true,
    //     congestion: true,
    //     //add style sheet to customize the directions
    //     // styles: style,
    //     // placeholderOrigin: 'Hey hey hey'
    //     // placeholderDestination: ''
    //   });
    //   console.log('reached here')
  
    //   // add to your mapboxgl map
    //   map.addControl(directions, 'bottom-right');


      //TODO: infinite loop :(
      // to map health status with hashmap
      // useEffect(() => {
      //   mockdata.map((data) => {
      //     setHealthType({ status: healthOptions[data.healthStatus]})
      //     checkHealthOption(data.healthStatus);
      //   })
        
      // }, [mockdata])

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

      // const getUserOrigin = (directions,coords) => {
      //   console.log('in get origin')
      //   if(coords){
      //     let lat = coords.lat
      //     let lgn = coords.lgn;
      //     console.log('in the if statement')
      //     console.log(coords)
      //     directions.setOrigin([lgn, lat]);
      //   }
      // }
    

      // useEffect(() => {
      //   if(coordinates && map){
      //     getUserOrigin();
      //   }
       
      // },[coordinates,map])




    return (
        <div id="mapbox">

        </div>
    )
}

export default Map;