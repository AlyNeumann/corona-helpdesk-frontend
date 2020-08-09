import React, { useEffect, useState } from 'react';
import 'echarts-gl';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import './analytics.css';

//TODO: add data from api call
const CurrentCases = () => {

    //window resizing attempt
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    // //data from all provinces
    const [data, setData] = useState();
    // console.log(data)

    const [ontario, setOntario] = useState();
    // const ontario = data[0];
    const [quebec, setQuebec] = useState();
    // const quebec = data[1];
    const [novascotia, setNovascotia] = useState();
    // const novascotia = data[2];
    const [newbrunswick, setNewbrunswick] = useState();
    // const newbrunswick = data[3];
    const [manitoba, setManitoba] = useState();
    // const manitoba = data[4];
    const [britishcolumbia, setBritishcolumbia] = useState()
    // const britishcolumbia = data[5];
    const [pei, setPei] = useState();
    // const pei = data[6];
    const [sask, setSask] = useState();
    // const sask = data[7];
    const [alberta, setAlberta] = useState();
    // const alberta = data[8];
    const [newfoundland, setNewfoundland] = useState();
    // const newfoundland = data[9];
    const [nwterritories, setNwterritories] = useState();
    // const nwterritories = data[10];
    const [yukon, setYukon] = useState();
    // const yukon = data[11];
    const [nunavit, setNunavit] = useState();
    // const nunavit = data[12];

    const [option, setOption] = useState();


    const getData = async () => {

        //TODO: AHHHH BEING BLOCKED BY CORS!!!!
        const cors = 'https://cors-anywhere.herokuapp.com/'
        const url = `${cors}https://api.covid19tracker.ca/summary/split`

        await fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                //only use most recent object with info in it
                //feilds: total_cases, total_fatalities, total_tests
                //total_hospitalizations, total_criticals, total_recoveries
                setData(response.data)
        
            })
    }
    useEffect(() => {
        getData()
    }, [])

    //resize viewport 
    useEffect(() => {
        const handleResize = () => {
            setViewport({
                ...viewport,
                width: window.innerWidth,
                height: window.innerHeight,
            })
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {
        if (data) {
                    setOntario(data[0]);
                    setQuebec(data[1]);
                    setNovascotia(data[2]);
                    setNewbrunswick(data[3]);
                    setManitoba(data[4]);
                    setBritishcolumbia(data[5]);
                    setPei(data[6]);
                    setSask(data[7]);
                    setAlberta(data[8]);
                    setNewfoundland(data[9]);
                    setNwterritories(data[10]);
                    setYukon(data[11]);
                    setNunavit(data[12]);
                }
    }, [data])

    useEffect(() => {
        if(nunavit){
            setOption({
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['province', 'ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'],
                        source: [
                            { province: 'total cases', 'ON': ontario.total_cases, 'QC': quebec.total_cases, 'NS': novascotia.total_cases, 'NB': newbrunswick.total_cases, 'MB': manitoba.total_cases, 'BC': britishcolumbia.total_cases, 'PE': pei.total_cases, 'SK': sask.total_cases, 'AB': alberta.total_cases, 'NL': newfoundland.total_cases, 'NT': nwterritories.total_cases, 'YT': yukon.total_cases, 'NU': nunavit.total_cases },
                            { province: 'total fatalities', 'ON': ontario.total_fatalities, 'QC': quebec.total_fatalities, 'NS': novascotia.total_fatalities, 'NB': newbrunswick.total_fatalities, 'MB': manitoba.total_fatalities, 'BC': britishcolumbia.total_fatalities, 'PE': pei.total_fatalities, 'SK': sask.total_fatalities, 'AB': alberta.total_fatalities, 'NL': newfoundland.total_fatalities, 'NT': nwterritories.total_fatalities, 'YT': yukon.total_fatalities, 'NU': nunavit.total_fatalities },
                            // { province: 'total tests', 'ON': ontario.total_tests, 'QC': quebec.total_tests, 'NS': novascotia.total_tests, 'NB': newbrunswick.total_tests, 'MB': manitoba.total_tests, 'BC': britishcolumbia.total_tests, 'PE': pei.total_tests, 'SK': sask.total_tests, 'AB': alberta.total_tests, 'NL': newfoundland.total_tests, 'NT': nwterritories.total_tests, 'YT': yukon.total_tests, 'NU': nunavit.total_tests },
                            // { province: 'total hospitilizations', 'ON': ontario.total_hospitalizations, 'QC': quebec.total_hospitalizations, 'NS': novascotia.total_hospitalizations, 'NB': newbrunswick.total_hospitalizations, 'MB': manitoba.total_hospitalizations, 'BC': britishcolumbia.total_hospitalizations, 'PE': pei.total_hospitalizations, 'SK': sask.total_hospitalizations, 'AB': alberta.total_hospitalizations, 'NL': newfoundland.total_hospitalizations, 'NT': nwterritories.total_hospitalizations, 'YT': yukon.total_hospitalizations, 'NU': nunavit.total_hospitalizations},
                            // { province: 'total criticals', 'ON': ontario.total_criticals, 'QC': quebec.total_criticals, 'NS': novascotia.total_criticals, 'NB': newbrunswick.total_criticals, 'MB': manitoba.total_criticals, 'BC': britishcolumbia.total_criticals, 'PE': pei.total_criticals, 'SK': sask.total_criticals, 'AB': alberta.total_criticals, 'NL': newfoundland.total_criticals, 'NT': nwterritories.total_criticals, 'YT': yukon.total_criticals, 'NU': nunavit.total_criticals },
                            { province: 'total recoveries', 'ON': ontario.total_recoveries, 'QC': quebec.total_recoveries, 'NS': novascotia.total_recoveries, 'NB': newbrunswick.total_recoveries, 'MB': manitoba.total_recoveries, 'BC': britishcolumbia.total_recoveries, 'PE': pei.total_recoveries, 'SK': sask.total_recoveries, 'AB': alberta.total_recoveries, 'NL': newfoundland.total_recoveries, 'NT': nwterritories.total_recoveries, 'YT': yukon.total_recoveries, 'NU': nunavit.total_recoveries },
                        ]
                    },
                    xAxis: { type: 'category' },
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        { type: 'bar' },
                        // { type: 'bar' },
                        // { type: 'bar' },
                        // { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' }
                    ]
                })
        }

    }, [nunavit])

    return (
        <div className="province-container chart-container">
            <h5>Reports by Province</h5>
            <h6 className="provinces">Click on the province initals to filter</h6>
            { option && 
             <ReactEchartsCore
             echarts={echarts}
             option={option}
             className="chart"
             style={{ width: viewport.width, maxHeight: "300px", paddingRight: "15%", marginLeft: "5%"  }}
         /> 
        // : <p>Loading...</p>}
}
           

        </div>
    )
}

export default CurrentCases;