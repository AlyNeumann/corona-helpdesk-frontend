import { useState, useEffect } from 'react';


const useGeoJson = () => {
    const [geocodes, setGeocodes] = useState([]);
 

    const getGeoJson = async () => {
        await fetch("/api/geocodes")
            .then(res => {
                return res.json();
            })
            .then(data => {
                //ternary here to seperate geocodes
                //TODO: does the data need to be filtered before setting? 
                console.log("data from geocodes hook " + JSON.stringify(data.healthStatus));
                    setGeocodes(data)
              
            });
    };

    useEffect(() => {
        getGeoJson();
    }, []);

    return [ geocodes ];
}

export default useGeoJson;