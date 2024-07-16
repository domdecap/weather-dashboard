let generateImage = function (WeatherConditions) {
    let WeatherImage = document.createElement('img');
    if (199 < WeatherConditions && WeatherConditions < 233) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png')
    } else if (299 < WeatherConditions && WeatherConditions < 322) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png')
    } else if (499 < WeatherConditions && WeatherConditions < 532) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png')
    } else if (599 < WeatherConditions && WeatherConditions < 623) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png')
    } else if (700 < WeatherConditions && WeatherConditions < 782) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png')
    } else if (WeatherConditions == 800) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png')
    } else {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png')
    }
    return WeatherImage;
};

let getFiveDays = function (weather) {
    let daily = weather.daily

    let fiveDay = document.querySelector('#five-day')

    fiveDay.innerHTML = ' '
    for (let i = 0; i< daily.length - 3; i++) {
        let dateHeadingCount = FutureCheck(i);
        let dailyWeatherConditions = daily[i].weather[0].id;
        let dailyTemp = daily[i].temp.day;
        let dailyWind = daily[i].wind_speed;
        let dailyHumidity = daily[i].humidity;

        let dayDivEl = document.createElement('div');
        let dateHeadingEl = document.createElement('h3');
        let ulEl = document.createElement('ul');
        let daytempLiEl = document.createElement('li');
        let daywindLiEl = document.createElement('li');
        let dayhumidtyLiEl = document.createElement('li');

        let dailyIcon = generateImage(dailyWeatherConditions);

        dayDivEl.setAttribute('class', 'card col-auto bg-info m1 border border-dark');
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
    };
};