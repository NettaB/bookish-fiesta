const URL = 'https://api2.climacell.co/v2/historical';
const API_KEY = 'mFW54hIC4r5puNkKBrcfQ3Xy3dqFYXCJ';
const START_TIME = new Date('March 18, 2018 04:00:00 UTC').toISOString();
const END_TIME = new Date('March 19, 2018 03:59:59 UTC').toISOString();

const data = {
  geocode: {
    lon: -71.3120271,
    lat: 44.2705999
  },
  start_time: START_TIME,
  end_time: END_TIME,
  timestep: 1,
  fields: [
    {
      name: "wind_gust",
      units: "kph"
    }
  ]
};

const options = {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
    'apiKey': API_KEY
  },
  body: JSON.stringify(data)
};


export default function fetchData() {
  return fetch(URL, options)
    .then(response => {
      if(response.ok) {
        return response;
      }
      throw Error(response.statusText);
    })
    .then(response => response.json())
    .catch(errorMessage => {
      console.error(errorMessage);
      return null;
    });
}
