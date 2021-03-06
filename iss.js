const request = require('request'); 
 
 const fetchMyIP = (callback, ip) => { 
   request('https://api.ipify.org?format=json', (error, response, body) => {
     if (error) return callback (error, null);
     
     if(response.statusCode !== 200) {
       const msg = `Status code ${response.statusCode}`;
       return callback(Error(msg), null); 
     }
     ip = JSON.parse(body).ip; 
     return callback(null, ip);
    });
  };

  const fetchCoordsByIP = (ip, callback) => { 
    request(`http://freegeoip.app/json/${ip}`, (error, response, body) => {
      if (error) return callback(error, null);
    
      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        return callback(Error(msg), null);
      }
      const { latitude, longitude } = JSON.parse(body);
      console.log({ latitude, longitude });
      return callback(null, { latitude, longitude });
    });
  };

  const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times.`;
      return msg;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes }; 
  
  
  
  /**
   * Makes a single API request to retrieve the user's IP address.
   * Input:
   *   - A callback (to pass back an error or the IP string)
   * Returns (via Callback):
   *   - An error, if any (nullable)
   *   - The IP address as a string (null if error). Example: "162.245.144.188"
   */
