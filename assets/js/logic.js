const apiKey = "08165464bfbd1ce5ac98d7bccc10e4d7";
let searchBtnEl = $("#search-btn")
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];



let ApiSearch = function(){
    let cityInput = $("#City");
    let cityVal = cityInput.val();
    const resultEl = $("#searchResult")
    const tempEl = $("#temp")
    const windEl = $("#wind")
    const humidityEl = $("#humidity")

    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=imperial`;
    fetch(queryURL)
    .then( function (response){
        if (response.ok){
        console.log("response", response);
        return response.json()
        }
        else{
            resultEl.text("This city doesn't exist. Try a new one.")
            resultEl.css("color", "red")
            throw new Error("This API is not connecting properly")
        }
    })
    .then(function (data){
        console.log("data", data)
        resultEl.text(`The weather in ${data.name} is:`);
        tempEl.text(`Temp: ${data.main.temp}°F`);
        windEl.text(`Wind: ${data.wind.speed}mph`);
        humidityEl.text(`Humidity: ${data.main.humidity}%`);
        searchHistory.unshift(data.name);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        loadHistory();
        
    })

    cityInput.val("")
}     

let forecastSearch = function(){
    let cityInput = $("#City");
    let cityVal = cityInput.val();
    const resultEl = $("#searchResult")
    const tempEl = $("#temp")
    const windEl = $("#wind")
    const humidityEl = $("#humidity")

    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=imperial`;
    fetch(queryURL)
    .then( function (response){
        if (response.ok){
        console.log("response", response);
        return response.json()
        }
        else{
            resultEl.text("This city doesn't exist. Try a new one.")
            resultEl.css("color", "red")
            throw new Error("This API is not connecting properly")
        }
    })
    .then(function (data){
        console.log("data", data)
        resultEl.text(`The weather in ${data.name} is:`);
        tempEl.text(`Temp: ${data.main.temp}°F`);
        windEl.text(`Wind: ${data.wind.speed}mph`);
        humidityEl.text(`Humidity: ${data.main.humidity}%`);
        searchHistory.unshift(data.name);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        loadHistory();
        
    })

    cityInput.val("")
}     

const loadHistory = function(){
    const historyList = $(".list-group");
    historyList.empty(); // Clear previous history items
    for (let search of searchHistory){
        const historyItem = $("<button>")
        historyItem.addClass("list-group-item", "list-group-item-action")
        historyItem.text(search)
        historyList.append(historyItem)
    }
}

window.addEventListener('load', function() {
    // Your function call here
    loadHistory();
});
// Search for city on API 
searchBtnEl.click(function() {
    ApiSearch();
    loadHistory();
});

// Search for 5-day forecast
// searchBtnEl.click(forecastSearch)


