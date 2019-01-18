const URL = 'https://api2.climacell.co/v2/historical';
const API_KEY = 'mFW54hIC4r5puNkKBrcfQ3Xy3dqFYXCJ';
const START_TIME = new Date('March 18, 2018 04:00:00 UTC').toISOString();
const END_TIME = new Date('March 19, 2018 03:59:59 UTC').toISOString();
const TIMESTEP = 5;

const body = {
  geocode: {
    lon: -71.3120271,
    lat: 44.2705999
  },
  start_time: START_TIME,
  end_time: END_TIME,
  time_step: TIMESTEP,
  fields: [
    {
      name: 'wind_gust',
      unit: 'kph'
    }
  ]
};

const options = {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
    'apiKey': API_KEY
  },
  body: JSON.stringify({
    "geocode": {
      "lon": -71.3120271,
      "lat": 44.2705999
    },
    "start_time": START_TIME,
    "end_time": END_TIME,
    "timestep": 5,
    "fields": [
      {
        "name": "wind_gust",
        "units": "kph"
      }
    ]
  })
};

const chatFactory = chat => ({
  x: new Date(chat.observation_time.value).getTime(),
  y: chat.wind_gust.value,
});

export default function fetchData() {
  return fetch(URL, options)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => response.json())
    .then(data => data.map(chatFactory))
    .then(data => {
      return data;
    })
    .catch(errorMessage => {
      console.error(errorMessage);
      return null;
    });
}
