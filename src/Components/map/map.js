import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from '../marker/marker';
import Popup from '../popup/popup';
import useMap from '../../Hooks/useMap';
import useGeoJson from '../../Hooks/useGeoJson';
import './map.css';




const Map = () => {

    const [map] = useMap("mapbox")
    // const [greenGeoJson, yellowGeoJson, redGeoJson] = useGeoJson();

    //mock data to be removed 
    const mockdataGreen = [
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
        }
    ]

    const mockdataRed = [
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


        //add a marker for each user using lat & long
        const addMarkers = (map, mockdata) => {
            console.log(mockdata)
            mockdata.forEach(data => {
                let coords = [data.location.coords.lng, data.location.coords.lat];
                const marker_el = Marker(map, coords, "green").getElement();
                //popup on each marker
                console.log(data.location.coords)
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
            <div className="popup-description">{data.needs.need}</div>
            <div className="popup-description">{data.address}</div>
            <div className="popup-description">{data.healthStatus}</div>

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


      useEffect(() => {
        if (mockdataGreen && map) {
          addMarkers(map, mockdataGreen );
        }
      }, [map, mockdataGreen]);

    //   useEffect(() => {
    //     if (mockdataYellow && map) {
    //       addMarkers(map, mockdataYellow );
    //     }
    //   }, [map, mockdataYellow]);
    
      useEffect(() => {
        if (mockdataRed && map) {
          addMarkers(map, mockdataRed );
        }
      }, [map, mockdataRed]);




    return (
        <div id="mapbox">

        </div>
    )
}

export default Map;