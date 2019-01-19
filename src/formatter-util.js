const dateOptions = {hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York', hour12: false};

export const speedFormatter = val => `${val} kph`;
export const timeFormatter = timeStamp => new Date(timeStamp).toLocaleTimeString('en-US',dateOptions);
