import mapboxgl from "mapbox-gl";


//popup for each marker 

// var markerHeight = 14, markerRadius = 10, linearOffset = 25;
// const popupOffsets = {
//     'top': [0, 0],
//     'top-left': [0, 0],
//     'top-right': [0, 0],
//     'bottom': [0, -markerHeight],
//     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//     'left': [markerRadius, (markerHeight - markerRadius) * -1],
//     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
// };

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