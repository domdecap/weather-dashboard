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
    if (!weather || !weather.list || weather.list.length === 0) {
        console.error('No forecast data available');
        return;
    }


    let fiveDay = document.querySelector('#five-day')
    fiveDay.innerHTML = ' '

    for (let i = 0; i< 5; i++) {
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
    };
};