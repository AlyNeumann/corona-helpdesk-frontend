import React from 'react'; 
import mapboxgl from "mapbox-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';


const Marker = (map,coord,type) => {
  var el =  <LocationOnIcon />
  var marker = new mapboxgl.Marker(el).setLngLat(coord).addTo(map);
  return marker;
};
export default Marker;