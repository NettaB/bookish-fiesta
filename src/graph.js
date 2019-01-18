import React from 'react';
import { XYPlot, XAxis, YAxis, MarkSeries } from 'react-vis';

const dateOptions = {hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York', hour12: false};

const yAxisFormatter = val => `${val} kph`;
const xAxisFormatter = timeStamp => new Date(timeStamp).toLocaleTimeString('en-US',dateOptions);

export default function Graph(props) {
  return (
    <div className='graph-container'>
      <XYPlot width={2000} height={600} margin={{top: 20, right: 20, bottom: 60, left: 80}}>
        <XAxis title={'Time'} position='middle' tickFormat={xAxisFormatter}/>
        <YAxis title={'Gust Speed'} position='middle' tickFormat={yAxisFormatter}/>
        <MarkSeries data={props.data} size='2' colorType='literal' color='darkblue' className='foo'/>
      </XYPlot>
    </div>
  );
}
