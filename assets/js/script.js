// script.js

// API key and constants
const APIkey = "ef2c2c6991b3d98d4dd604ae3b8915e9";
const part = 'alerts,minutely';
const citiesArray = JSON.parse(localStorage.getItem('city')) || [];

// Event listener for form submission
document.querySelector('#city-search').addEventListener('submit', locationCatch);

// Function to handle form submission and fetch location data
function locationCatch(event) {
    event.preventDefault();
    let cityCapture = document.querySelector('#city-capture').value.trim();

    if (cityCapture === '') {
        alert('Search field is blank');
    } else {
        let cityCaptureObj = { city: cityCapture };
        citiesArray.push(cityCaptureObj);
        localStorage.setItem('city', JSON.stringify(citiesArray));
        locationApiCall(cityCapture);
        retrieveLocalStorage();
    }
}

// Function to fetch location data from OpenWeather API
function locationApiCall(cityname) {
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${APIkey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(function (response) {
        if (response.length === 0) {
            throw new Error('City not found');
        }
        let lat = response[0].lat;
        let lon = response[0].lon;
        apiCall(lat, lon, cityname);
    })
    .catch(err => alert('Not found'));
}

// Function to fetch weather data from OpenWeather API
function apiCall(lat, lon, cityname) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(function (response) {
        console.log(response); // Log the response for debugging
        generateCurrent(response, cityname);
        getFiveDays(response);
    })
    .catch(err => console.error('Error fetching weather data:', err));
}


const recentCities = document.querySelector('#recent-searches');
// Function to retrieve data from localStorage and update the UI
function retrieveLocalStorage() {
    let LocalStorageRetrive = JSON.parse(localStorage.getItem('city'));

    if (LocalStorageRetrive) {
        recentCities.textContent = '';
        for (let i = 0; i < LocalStorageRetrive.length; i++) {
            let makeButton = buttonCreation(LocalStorageRetrive[i].city);
            makeButton.setAttribute('class', 'btn btn-secondary m-2 city-button');
            recentCities.appendChild(makeButton);
        }
    } else {
        recentCities.innerHTML = "Recent searches here";
    }
}

// Function to load data from localStorage on page load
function loadLocalStorage() {
    if (localStorage.getItem('city')) {
        let LocalStorageRetrive = JSON.parse(localStorage.getItem('city'));

        for (let i = 0; i < LocalStorageRetrive.length; i++) {
            let cityCaptureObj = {
                city: LocalStorageRetrive[i].city
            };
            citiesArray.push(cityCaptureObj);
        }
        retrieveLocalStorage();
    } else {
        recentCities.innerHTML = "Recent searches here";
    }
}

// Load localStorage data on page load
loadLocalStorage();

// Function to get the current date
function TimeCheck() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `(${month}/${day}/${year})`;
}

// Function to get future dates
function FutureCheck(i) {
    const date = new Date();
    const day = date.getDate() + i + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `(${month}/${day}/${year})`;
}

// Function to generate the current weather information
function generateCurrent(weather, cityname) {
    if (!weather || !weather.list || weather.list.length === 0) {
        console.error('No current weather data available');
        return;
    }
    
    let current = weather.list[0];

    let headingEl = document.querySelector('#location');
    headingEl.textContent = cityname + " " + TimeCheck();

    let temp = current.main.temp;
    let wind = current.wind.speed;
    let humidity = current.main.humidity;
    let description = current.weather[0].description;

    let descriptionLiEl = document.createElement('li');
    descriptionLiEl.textContent = `Description: ${description}`;

    let currentConditions = document.querySelector('#current-conditions');

    currentConditions.innerHTML = `
    <li> Temperature: ${temp} \u00B0F </li>
    <li> Wind: ${wind} MPH </li>
    <li> Humidity: ${humidity} %</li>
    `;
    currentConditions.appendChild(descriptionLiEl);
}

// Function to generate weather icons based on weather conditions
function generateImage(WeatherConditions) {
    let WeatherImage = document.createElement('img');
    if (199 < WeatherConditions && WeatherConditions < 233) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
    } else if (299 < WeatherConditions && WeatherConditions < 322) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
    } else if (499 < WeatherConditions && WeatherConditions < 532) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png');
    } else if (599 < WeatherConditions && WeatherConditions < 623) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
    } else if (700 < WeatherConditions && WeatherConditions < 782) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
    } else if (WeatherConditions === 800) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
    } else {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');
    }
    return WeatherImage;
}

// Function to generate the 5-day weather forecast
function getFiveDays(weather) {
    if (!weather || !weather.list || weather.list.length === 0) {
        console.error('No forecast data available');
        return;
    }

    let fiveDay = document.querySelector('#five-day');
    fiveDay.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        let daily = weather.list[i * 8];
        
        let dateHeadingCount = FutureCheck(i);
        let dailyWeatherConditions = daily.weather[0].id;
        let dailyTemp = daily.main.temp;
        let dailyWind = daily.wind.speed;
        let dailyHumidity = daily.main.humidity;

        let dayDivEl = document.createElement('div');
        let dateHeadingEl = document.createElement('h3');
        let ulEl = document.createElement('ul');
        let daytempLiEl = document.createElement('li');
        let daywindLiEl = document.createElement('li');
        let dayhumidtyLiEl = document.createElement('li');

        let dailyIcon = generateImage(dailyWeatherConditions);

        // Add Bootstrap or custom classes for styling
        dayDivEl.setAttribute('class', 'card col-auto bg-info m-1 border border-dark');
        dateHeadingEl.setAttribute('class', 'card-text text-black');
        daytempLiEl.setAttribute('class', 'card-text text-black');
        daywindLiEl.setAttribute('class', 'card-text text-black');
        dayhumidtyLiEl.setAttribute('class', 'card-text text-black');
        dailyIcon.setAttribute('class', 'card-img-top');

        dateHeadingEl.textContent = dateHeadingCount;
        daytempLiEl.textContent = `Temperature: ${dailyTemp} \u00B0F`;
        daywindLiEl.textContent = `Wind: ${dailyWind} MPH`;
        dayhumidtyLiEl.textContent = `Humidity: ${dailyHumidity} %`;

        dayDivEl.appendChild(dateHeadingEl);
        dayDivEl.appendChild(dailyIcon);
        dayDivEl.appendChild(ulEl);
        ulEl.appendChild(daytempLiEl);
        ulEl.appendChild(daywindLiEl);
        ulEl.appendChild(dayhumidtyLiEl);
        fiveDay.appendChild(dayDivEl);
    }
}

// Recent searches related functions


// Function to get button value and call locationApiCall
function getButtonValue(value) {
    let buttonValue = value.innerHTML;
    locationApiCall(buttonValue);
}

// Function to create a button for a city
function buttonCreation(content) {
    let citybtn = document.createElement('button');
    citybtn.textContent = content;
    citybtn.onclick = function () { getButtonValue(this); };
    return citybtn;
}

// Load localStorage data on page load
loadLocalStorage();
locationApiCall('Cleveland');
