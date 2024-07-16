let generateCurrent = function (weather, cityname) {
    let current = weather.current;

    let headingEl = document.querySelector('#location');
    headingEl.textContent = cityname + " " + TimeCheck();

    let temp = current.temp;
    let wind = current.wind_speed;
    let humidity = current.humidity;
    let uvIndex = current.uvi;

    let uvIndexLiEl = document.createElement('li')
    uvIndexLiEl.textContent = 'UV Index: ${uvIndex}'

    let currentConditions = document.querySelector('#current-conditions')

    currentConditions.innerHTML = `
    <li> Temperature: ${temp} \u00B0F </li>
    <li> Wind: ${wind} MPH </li>
    <li> Humidity: ${humidity} %</li>
    `
    currentConditions.appendChild(uvIndexLiEl)
    checkUVIndex(uvIndex, uvIndexLiEl)
};