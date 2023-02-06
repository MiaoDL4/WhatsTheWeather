//b7a55a602c54c17bc010a65a5bf43262 api key

var weatherInput = document.querySelector('#weatherForm');
var cityList = [];

weatherInput.addEventListener('submit', function (e) {
    e.preventDefault();
    var userInput = document.querySelector('#cityUserInput').value;
    //getWeatherData(userInput);
    displayCities(userInput);
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
    }
})

function getWeatherData(userInput) {
    var API = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=b7a55a602c54c17bc010a65a5bf43262&units=metric`
    fetch(API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
                    weatherDayDisplay.innerHTML = `
                        <div>${day}</div>
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
    let cityHistoryList = localStorage.getItem(JSON.parse('cityHistory'));
    if (cityHistoryList){
        cityHistoryList = JSON.parse(cityHistoryList);
    } else{
        cityHistoryList = [];
    }

    console.log(cityHistoryList);
    console.log(cityHistoryList.includes(userInput));
    if (cityHistoryList.includes(userInput) == true) {
        let filterCity = cityList.filter(city => city != userInput);
        filterCity.push(userInput);
        console.log(filterCity);
        localStorage.setItem('cityHistory', JSON.stringify(filterCity));
    } else {
        console.log('ntohing')
    };

}

function displayCities() {
    var cityList = localStorage.getItem('cityHistory')

}