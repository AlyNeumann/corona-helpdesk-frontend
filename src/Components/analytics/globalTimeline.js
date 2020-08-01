import React, { useEffect, useState } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import './analytics.css';

const GlobalTimeLine = () => {

    //window resizing attempt
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    }) 

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
        //   title: {
        //       text: 'Covid 19 Global'
        //   },
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
        //global time line
        const url = ' https://corona-api.com/timeline';
     
        await fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                // console.log(response)
                setData(response.data)
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
        getData()
    }, [])

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

    return(
        <div className="chart-container">
            <h5>Covid 19 Global</h5>
              {data &&
                <ReactEchartsCore
                    echarts={echarts}
                    option={option}
                    className="chart"
                    style={{width: viewport.width, maxHeight: "300px", paddingRight: "15%"}}
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

export default GlobalTimeLine;