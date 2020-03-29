import mapboxgl from "mapbox-gl";
import './marker.css';


const Marker = (map, coord, type) => {
  var el = document.createElement("div");
  if(type === "green"){
    el.className = "marker-green";
  }else if(type === "yellow"){
      el.className = "marker-yellow"
  }else{
    el.className = "marker-red"
  }
  el.style.width = "25px";
  el.style.height = "25px";
  el.style.backgroundSize = "100% 100%";

  var marker = new mapboxgl.Marker(el).setLngLat(coord).addTo(map);
  return marker;
};
export default Marker;