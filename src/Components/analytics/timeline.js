import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';

const TimeLineAnalytics = () => {

    const [data, setData] = useState(null);
    //data for deaths 
    const [deaths, setDeaths] = useState([]);
    //state for confirmed
    const [confirmed, setConfirmed] = useState([]);
    //state for days
    const [days, setDays] = useState([]);
    //state for active
    const [active, setActive] = useState([]);
    //state for recovered
    const [recovered, setRecovered] = useState([]);
    //state for newly confirmed 
    const [newlyConfirmed, setNewlyConfirmed] = useState([]);

    //options 
    const option = {
        title: {
            text: 'Covid 19 Canada'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Deaths', 'Confirmed', 'Active', 'Recovered', 'New Confirmed']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: days
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Deaths',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: deaths
            },
            {
                name: 'Confirmed',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: confirmed
            },
            {
                name: 'Active',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: active
            },
            {
                name: 'Recovered',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: recovered
            },
            {
                name: 'New Confirmed',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: newlyConfirmed
            }
        ]
    };

    const getData = async () => {

        //TODO: make component for each end point
        //for canada
        // const url = 'https://corona-api.com/countries/CA';
      
        //for canada with timeline
        const url = 'https://corona-api.com/countries/CA?include=timeline';
        await fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                setData(response.data.timeline)
            })
    }
    //loop through data
    const makeDataArr = (data) => {
        //loop through deaths and set to state
        let deathsResult = data.map(a => a.deaths).reverse();
        setDeaths(deathsResult);

        let confirmedResults = data.map(a => a.confirmed).reverse();
        setConfirmed(confirmedResults);

        let dateResult = data.map(a => a.date).reverse();
        setDays(dateResult);

        let activeResult = data.map(a => a.active).reverse();
        setActive(activeResult);

        let recoveredResult = data.map(a => a.recovered).reverse();
        setRecovered(recoveredResult);

        let newResult = data.map(a => a.new_confirmed).reverse();
        setNewlyConfirmed(newResult);
    }

    //if there is data, call this function
    useEffect(() => {
        if (data) {
            makeDataArr(data)
        }
    }, [data])

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {/* <ReactEcharts
                option={GL_OPTION}
            /> */}
            {data &&
                <ReactEchartsCore
                    echarts={echarts}
                    option={option}
                // notMerge={true}
                // lazyUpdate={true}
                // theme={"theme_name"}
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
                // opts={} 
                />}
        </div>
    )
}

export default TimeLineAnalytics;
