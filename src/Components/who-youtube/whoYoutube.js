import React, { useEffect } from 'react';

//this component links to the World Health Organization's youtube feed
//TODO - its only getting the channel, not sure if videos will be present on page....

const WhoYoutube = () => {

    // const getChannel = () => {
    //     //WHO url - https://www.youtube.com/channel/UC07-dOwgza1IguKA86jqxNA

    //     //TODO: make this dynamic if you start wanting more than one channel
    //     const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=who&key=AIzaSyCAIVPD6SUujzBADPAbfPs8PsD0g-ovFK4'
    //     fetch(url, {
    //         method: 'GET',
    //         redirect: 'follow'
    //     })
    //         .then(res => res.json())
    //         .then(response => {
    //             // console.log(response)
    //         })
    //         .catch(err => console.log(err))

    // }

    // useEffect(() => {
    //     getChannel();
    // }, [])

    return (
        <div>
            <h2>Youtube Updates from the WHO</h2>
        </div>
    )
};

export default WhoYoutube;

