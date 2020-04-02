import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';

const PieChart = () => {
    const [data, setData] = useState([])

    const option = {
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



    return (
        <div>
            <ReactEchartsCore
                echarts={echarts}
                option={option}
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