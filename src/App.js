import React, { useState, useEffect } from 'react';
import './App.css';
import fetchData from './http-service';
import Graph from './graph';
import { timeFormatter } from './formatter-util';

const App = () => {
  const [data, setData] = useState({dataList: null, maximum: null});
  const [errorMessage, setErrorMessage] = useState(null);

  const findMax = (acc, currentValue, currentIndex) => {
    if (currentValue.y > acc.y) {
      acc = {...currentValue};
      acc.i = currentIndex;
    }
    return acc;
  };

  useEffect(() => {
    if(!data.dataList) {
      fetchData().then(dataList => {
        if (!dataList) {
          setErrorMessage('Could not fetch data, retrying');
          return;
        }
        const maximum = dataList.reduce(findMax, {y: 0, x: 0, i: 0});
        dataList[maximum.i].color = 'indianred';
        dataList[maximum.i].size = '4';
        setData({dataList, maximum});
        setErrorMessage(null);
      })
    }
  });

  return (
    <div className="App">
      <h1>
        March 18 2018, Mount Washington NH
      </h1>
      {errorMessage && <h3 className='error'>{errorMessage}</h3>}
      {data.maximum ?
        <h3>Hats are most likely to fly at {timeFormatter(data.maximum.x)} with a wind gust speed of {data.maximum.y} kph</h3> :
        <h3 className='loading'>Loading...</h3>}
      {data.dataList && <Graph data={data.dataList}/>}
    </div>
  );
};

export default App;
