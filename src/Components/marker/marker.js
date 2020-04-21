import mapboxgl from "mapbox-gl";
import './marker.css';


const Marker = (map, coord, type) => {
  var el = document.createElement("div");
  console.log(el);
  console.log(type)
  if(type === "green"){
    el.className = "marker-green";
  }else if(type === "yellow"){
      el.className = "marker-yellow"
  }else{
    el.className = "marker-red"
  }
  el.style.width = "35px";
  el.style.height = "35px";
  el.style.backgroundSize = "100% 100%";

  var marker = new mapboxgl.Marker(el).setLngLat(coord).addTo(map);
  return marker;
};
export default Marker;