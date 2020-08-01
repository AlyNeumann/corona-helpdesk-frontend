import React, { useState, useEffect } from 'react';
import OutlinedCard from './card';
import './analytics.css';

const ScoreBoard = () => {

    const [data, setData] = useState([]);
    const [date, setDate] = useState('');

   const getCurrentDate = () => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        const stringDate = `${year} | ${month<10?`0${month}`:`${month}`} | ${date}`
            setDate(stringDate);
        }

    const getData = async () => {

        //TODO: make component for each end point
        //for canada
        const url = 'https://corona-api.com/countries/CA';

        await fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                // console.log(response)
                setData(response.data.latest_data)
            })
    }
    useEffect(() => {
        getData()
        getCurrentDate()
    }, [])

    return(
        <div className="scoreboard-container">
            <div className="scoreboard-inner">
                <OutlinedCard title="Deaths" status={data.deaths} date={date}/>
                <OutlinedCard title="Confirmed" status={data.confirmed} date={date}/>
                <OutlinedCard title="Recovered" status={data.recovered} date={date}/>
                <OutlinedCard title="Critical" status={data.critical} date={date}/>
            </div>
        </div>
    )
}

export default ScoreBoard;