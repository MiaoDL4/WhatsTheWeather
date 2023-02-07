const weatherInput = document.querySelector('#weatherForm');
const cityDislayArea = document.querySelector('#pastCitySearches');
const citySelect = document.querySelectorAll('#citySelect');
var cityList = [];

function getWeatherData(userInput) { //call api data
    let API = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=b7a55a602c54c17bc010a65a5bf43262&units=metric`
    fetch(API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.querySelector('#cityName').innerHTML = userInput;
            let allWeatherData = data.list.slice(0, 40); //get bit with weather data
            console.log(allWeatherData);

            for (i = 0; i < allWeatherData.length; i++) {
                if (allWeatherData[i].dt_txt.search("15:00:00") != -1) { // check to see if 3pm 
                    let timeStamp = new Date(allWeatherData[i].dt * 1000); //conversion of unix time to ms
                    let day = timeStamp.toLocaleString("en-GB", { weekday: "long" })
                    let date = timeStamp.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                    let icon = allWeatherData[i].weather[0].icon;
                    let temp = allWeatherData[i].main.temp;
                    let wind = allWeatherData[i].wind.speed;
                    let hum = allWeatherData[i].main.humidity;
                    console.log(allWeatherData[i].dt_txt);
                    let weatherDayDisplay = document.createElement('div');
                    weatherDayDisplay.classList.add('col')
                    weatherDayDisplay.classList.add('board')
                    weatherDayDisplay.innerHTML = `
                        <div>${day}</div>
                        <div>${date}</div>
                        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
                        <div>${temp}C</div>
                        <div>Wind Speed: ${wind}</div>
                        <div>Humidity: ${hum}%</div>`;
                    document.querySelector('#forecast').appendChild(weatherDayDisplay);
                }
            }
        })
}

function checkCity(userInput) { //all the ifs and else are just to check if the same data is already in local storage
    if (localStorage.getItem("cityHistory") === null) { // the has to be a better way for for the first check. on start check local storage?
        console.log('empty')
        cityList.push(userInput);
        localStorage.setItem('cityHistory', JSON.stringify(cityList));
    } else {
        let obj = localStorage.getItem('cityHistory');
        let cityHistoryList = JSON.parse(obj);
        if (cityHistoryList.includes(userInput) == false) {
            console.log('just add');
            cityHistoryList.push(userInput);
            localStorage.setItem('cityHistory', JSON.stringify(cityHistoryList));
        } else {
            console.log("nothing");
        };
    };
}

function displayCities() { //displays local storage data
    let obj = localStorage.getItem('cityHistory');
    let cityHistoryList = JSON.parse(obj);
    for (i = 0; i < cityHistoryList.length; i++) {
        let city = document.createElement('div');
        city.setAttribute("onclick", "searchSaveCity(event)");
        city.setAttribute("id", `${cityHistoryList[i]}`)
        city.classList.add("btn")
        city.classList.add("buttonBoard")
        city.innerHTML = `${cityHistoryList[i]}`;
        cityDislayArea.appendChild(city);
    }
}

function clearDisplayCities() { 
    cityDislayArea.innerHTML = '';
}

function searchSaveCity(event) {
    document.querySelector('#forecast').innerHTML = '';
    let text = event.target.id;
    let userInput = text;
    getWeatherData(userInput)
}

weatherInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let userInput = document.querySelector('#cityUserInput').value;
    getWeatherData(userInput);
    checkCity(userInput);
    document.querySelector('#forecast').innerHTML = '';
    clearDisplayCities();
    displayCities();
})

displayCities()

