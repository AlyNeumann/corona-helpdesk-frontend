import { useState, useEffect } from 'react';


const useGeoJson = () => {
    const [greenGeocodes, setGreenGeoCodes] = useState([]);
    const [yellowGeocodes, setYellowGeoCodes] = useState([]);
    const [redGeocodes, setRedGeoCodes] = useState([]);

    const getGeoJson = async () => {
        await fetch("http://localhost:5000/geocodes")
            .then(res => {
                return res.json();
            })
            .then(data => {
                //ternary here to seperate geocodes
                //TODO: does the data need to be filtered before setting? 
                console.log("data from geocodes hook " + JSON.stringify(data.healthStatus));
                if(data.healthStatus === 1){
                    setGreenGeoCodes(data)
                }else if(data.healthStatus === 2){
                    setRedGeoCodes(data)
                }else{
                    setYellowGeoCodes(data)
                }
            });
    };

    useEffect(() => {
        getGeoJson();
    }, []);

    return [ greenGeocodes, yellowGeocodes, redGeocodes ];
}

export default useGeoJson;