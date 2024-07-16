const citiesArray = [];
const recentCities = document.querySelector('#recent-searches');

let retrieveLocalStorage = function () {
    let LocalStorageRetrive = JSON.parse(localStorage.getItem('city'));

    if (LocalStorageRetrive) {
        recentCities.textContent = ''
        for (let i = 0; i < LocalStorageRetrive.length; i++) {
            let makeButton = buttonCreation(LocalStorageRetrive[i].city);
            makeButton.setAttribute('class', 'btn btn-secondary m-2 city-button')
            recentCities.appendChild(makeButton);
        }
    } else {
        recentCities.innerHTML = "Recent searches here"
    }
};

let loadLocalStorage = function () {
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
        recentCities.innerHTML = "Recent searches here"
    }
};

loadLocalStorage();
locationApiCall('Cleveland');