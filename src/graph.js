import React from 'react';
import { XYPlot, XAxis, YAxis, MarkSeries } from 'react-vis';
import { timeFormatter, speedFormatter} from './formatter-util';

export default function Graph(props) {
  return (
    <div className='graph-container'>
      <XYPlot width={2400} height={400} margin={{top: 20, right: 20, bottom: 60, left: 80}}>
        <XAxis title={'Time'} position='middle' tickFormat={timeFormatter}/>
        <YAxis title={'Gust Speed'} position='middle' tickFormat={speedFormatter}/>
        <MarkSeries data={props.data} colorType='literal' color='royalblue' className='foo' sizeRange={[1,4]}/>
      </XYPlot>
    </div>
  );
}
