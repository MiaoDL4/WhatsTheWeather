var weatherInput = document.querySelector('#weatherForm');
var cityList = [];
var cityDislayArea = document.querySelector('#pastCitySearches');
var citySelect = document.querySelectorAll('#citySelect')

weatherInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let userInput = document.querySelector('#cityUserInput').value;
    getWeatherData(userInput);
    checkCity(userInput);
    document.querySelector('#forecast').innerHTML = '';
    clearDisplayCities();
    displayCities();
})

function getWeatherData(userInput) {
    
    var API = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=b7a55a602c54c17bc010a65a5bf43262&units=metric`
    fetch(API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.querySelector('#cityName').innerHTML = userInput;
            var allWeatherData = data.list.slice(0, 40);
            console.log(allWeatherData);

            for (i = 0; i < allWeatherData.length; i++) {
                if (allWeatherData[i].dt_txt.search("15:00:00") != -1) {
                    var timeStamp = new Date(allWeatherData[i].dt * 1000);
                    var day = timeStamp.toLocaleString("en-GB", { weekday: "long" })
                    var date = timeStamp.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
                    var icon = allWeatherData[i].weather[0].icon;
                    var temp = allWeatherData[i].main.temp;
                    var wind = allWeatherData[i].wind.speed;
                    var hum = allWeatherData[i].main.humidity;
                    console.log(allWeatherData[i].dt_txt);

                    var weatherDayDisplay = document.createElement('div');
                    weatherDayDisplay.classList.add('col')
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
        }
    )
}

function checkCity(userInput) {
    if(localStorage.getItem("cityHistory") === null){
        console.log('empty')
        cityList.push(userInput);
        localStorage.setItem('cityHistory', JSON.stringify(cityList));
    }else{
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

function displayCities() {
    let obj = localStorage.getItem('cityHistory');
    let cityHistoryList = JSON.parse(obj);
    for (i = 0; i < cityHistoryList.length; i++){
        let city = document.createElement('div');
        city.setAttribute("onclick", "searchSaveCity(event)");
        city.setAttribute("id", `${cityHistoryList[i]}`)
        city.innerHTML = `${cityHistoryList[i]}`;
        cityDislayArea.appendChild(city);
    }
}

function clearDisplayCities(){
    cityDislayArea.innerHTML = '';
}

function searchSaveCity(event) {
    document.querySelector('#forecast').innerHTML = '';
    let text = event.target.id;
    let userInput = text;
    getWeatherData(userInput)
}
displayCities()