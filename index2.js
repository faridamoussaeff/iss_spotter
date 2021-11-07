const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = function(arrPasses) {
  let time = 0;
  let seconds = 0;
  for (let pass of arrPasses) {
    time = pass.risetime;
    seconds = pass.duration;
    console.log(`Next pass at ${time} GMT-0700 (Pacific Daylight Time) for ${seconds} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printTimes(passTimes);
});