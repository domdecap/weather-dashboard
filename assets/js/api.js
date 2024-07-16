const APIkey = "ef2c2c6991b3d98d4dd604ae3b8915e9";
const part = 'alerts,minutely';


let locationCatch = function (event) {
    event.preventDefault();
    let cityCapture = document.querySelector('#city-capture').value.trim();

    if (cityCapture === '') {
        alert('Search field is blank');
    } else {
        let cityCaptureObj = { city: cityCapture };
        citiesArray.push(cityCaptureObj)
        localStorage.setItem('city', JSON.stringify(citiesArray));
        locationApiCall(cityCapture)
        retrieveLocalStorage();
    
    }
};

let locationApiCall = function (cityname) {
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${APIkey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(function (response) {
        let lat = response[0].lat;
        let lon = response[0].lon;
        apiCall(lat, lon, cityname)
    })
    .catch(err => alert ('Not found'))
};

let apiCall = function (lat, lon, cityname) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(function (response) {
        console.log(response); // Add this line to check the API response

        generateCurrent(response, cityname);
        getFiveDays(response);
    });
};

document.querySelector('#city-search').addEventListener('submit', locationCatch)