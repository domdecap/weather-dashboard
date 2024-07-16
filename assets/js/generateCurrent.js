let generateCurrent = function (weather, cityname) {
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

    let descriptionLiEl = document.createElement('li')
    descriptionLiEl.textContent = `Description: ${description}`

    let currentConditions = document.querySelector('#current-conditions')

    currentConditions.innerHTML = `
    <li> Temperature: ${temp} \u00B0F </li>
    <li> Wind: ${wind} MPH </li>
    <li> Humidity: ${humidity} %</li>
    `
    currentConditions.appendChild(descriptionLiEl);
    
};