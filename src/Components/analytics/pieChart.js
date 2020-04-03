import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import './analytics.css';

const PieChart = () => {

      //window resizing attempt
      const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    }) 

    const [data, setData] = useState([])

    const option = {
        // title: {
        //     text: 'Covid 19 Global Today'
        // },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['Deaths', 'Confirmed', 'Recovered', 'Critical']
        },
        series: [
            {
                name: 'Current Global Cases Pie Chart',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: data.deaths, name: 'Deaths' },
                    { value: data.confirmed, name: 'Confirmed' },
                    { value: data.recovered, name: 'Recovered' },
                    { value: data.critical, name: 'Critical' }
                ]
            }
        ]
    };

    const getData = async () => {

        //TODO: make component for each end point
        //for canada
        const url = 'https://corona-api.com/countries/CA';

        await fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                setData(response.data.latest_data)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(data)
    console.log(data.deaths)

    //resize viewport 
    useEffect(() => {
        const handleResize= () => {
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


    return (
        <div  className="chart-container">
            <h5>Covid 19 Global</h5>
            <ReactEchartsCore
                echarts={echarts}
                option={option}
                className="chart"
                style={{width: viewport.width, maxHeight: "300px"}}
            // notMerge={true}
            // lazyUpdate={true}
            // theme={"theme_name"}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={} 
            />
        </div>
    )
}

export default PieChart;