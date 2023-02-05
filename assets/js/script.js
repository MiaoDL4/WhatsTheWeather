//b7a55a602c54c17bc010a65a5bf43262 api key

function getWeatherData(){
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=b7a55a602c54c17bc010a65a5bf43262&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })
}
