import mapboxgl from "mapbox-gl";

//pop up for map markers
export default class popup{
    constructor(){
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            // offset: popupOffsets
        });
    }

    getPopup(){
        return this.popup;
    }

    getElement(){
        return this.popup.getElement();
    }

}