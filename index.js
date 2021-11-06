// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('174.114.236.152',(error, coordinates) => {
  if(error) {
    console.log('ERROR', error); 
    return;
  }
  console.log('It worked. The coordinates are: ', coordinates);
});

fetchISSFlyOverTimes({ latitude: '45.3973', longitude: '-75.6883' }, (error, responseArr) => {
  if (error) {
    console.log('ERROR', error);
    return;
  }
  console.log("It worked! Passes: ", responseArr);
}); 