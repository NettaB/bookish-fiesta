import React, { useState, useEffect } from 'react';
import './App.css';
import fetchData from './http-service';
import Graph from "./graph";

const App = () => {
  const [dataList, setDataList] = useState(null);

  const findHighest = (list) => {
    let highestValue = 0;
    let highestIndex = 0;
    list.forEach((dataPoint, i) => {
      if (dataPoint.y > highestValue) {
        highestValue = dataPoint.y;
        highestIndex = i;
      }
    });
    list[highestIndex].color = 'red'
  };

  const findHighestIndex = (acc, currentValue, currentIndex) => {
    if (currentValue.y > acc.val) {
      acc.val = currentValue.y;
      acc.i = currentIndex;
    }
    return acc;
  };

  useEffect(() => {
    if(!dataList) {
      fetchData().then(dataList => {
        const highest = dataList.reduce(findHighestIndex, {val: 0, i: 0});
        dataList[highest.i].color = 'red';
        setDataList(dataList)
      })
    }
  });

  return (
    <div className="App">
      <h1>
        March 18, 2018, Mount Washington NH
      </h1>
      {dataList ? <Graph data={dataList}/> : <h3>Loading...</h3>}
    </div>
  );
};

export default App;
