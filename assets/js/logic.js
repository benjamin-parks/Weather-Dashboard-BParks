const apiKey = "08165464bfbd1ce5ac98d7bccc10e4d7";
let searchBtnEl = $("#search-btn");
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
let today = dayjs().format("MM/DD/YYYY")

console.log(today)

let ApiSearch = function(){
    let cityVal = $("#City").val(); // Retrieve cityVal from input field
    const resultEl = $("#searchResult");
    const tempEl = $("#temp");
    const windEl = $("#wind");
    const humidityEl = $("#humidity");
    const weatherEl = $("#weather");
    resultEl.css("color", "black")

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=imperial`;
    fetch(queryURL)
    .then(function (response){
        if (response.ok){
        console.log("response", response);
        return response.json();
        }
        else{
            resultEl.text("This city doesn't exist. Try a new one.");
            resultEl.css("color", "red");
            throw new Error("This API is not connecting properly");
        }
    })
    .then(function (data){
        console.log("data", data);
        if (data.weather[0].main === "Clouds"){
            weatherEl.text("☁️");
        }
        else if (data.weather[0].main === "Clear"){
            weatherEl.text("☀️");
        }
        else if (data.weather[0].main === "Rain"){
            weatherEl.text("🌧️");
        }
        else {
            weatherEl.text("🌩️");
        }
        resultEl.text(`${data.name} (${today})`);
        tempEl.text(`Temp: ${data.main.temp}°F`);
        windEl.text(`Wind: ${data.wind.speed}mph`);
        humidityEl.text(`Humidity: ${data.main.humidity}%`);
        searchHistory.unshift(data.name);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        loadHistory();
    });
};

let forecastSearch = function(){
    let cityVal = $("#City").val(); // Retrieve cityVal from input field
    const forecastDays = [$("#day1"), $("#day2"), $("#day3"), $("#day4"), $("#day5")];
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&appid=${apiKey}&units=imperial`;
    fetch(queryURL)
    .then(function (response){
        if (response.ok){
            console.log("response", response);
            return response.json();
        }
        else{
            resultEl.text("This city doesn't exist. Try a new one.");
            resultEl.css("color", "red");
            throw new Error("This API is not connecting properly");
        }
    })
    .then(function (data){
        console.log("forecast data", data);
        // Clear previous forecast items
        forecastDays.forEach(dayEl => dayEl.empty());
        const cityInput = $("#City")

        // Loop through each day of the forecast
        for (let i = 0; i < 5; i++) {
            const forecastDay = data.list[i * 8]; // Each day's data is at intervals of 8 (3-hour intervals)
            const date = dayjs().add(i, 'day').format('MM/DD/YYYY');
            const sky = $("<h2>").text(date);
            const temp = $("<p>");
            const wind = $("<p>");
            const humidity = $("<p>");

            // Set weather icon based on weather condition
            if (forecastDay.weather[0].main === "Clouds"){
                sky.append(" ☁️");
            }
            else if (forecastDay.weather[0].main === "Clear"){
                sky.append(" ☀️");
            }
            else if (forecastDay.weather[0].main === "Rain"){
                sky.append(" 🌧️");
            }
            else {
                sky.append(" 🌩️");
            }

            // Set temperature, wind speed, and humidity
            temp.text(`Temperature: ${forecastDay.main.temp}°F`);
            wind.text(`Wind: ${forecastDay.wind.speed}mph`);
            humidity.text(`Humidity: ${forecastDay.main.humidity}%`);

            // Append data to respective day element
            forecastDays[i].append(sky, temp, wind, humidity);
        }
        //clear search input field for the next search
        cityInput.val("");
    });

};
// call search functions from the values of list item clicked. 
const searchHistoryValue = function(cityVal) {
    $("#City").val(cityVal); // Set input field value to the selected history value
    ApiSearch(); // Trigger the ApiSearch function with the selected value
    forecastSearch(); // Trigger the forecastSearch function with the selected value
};

const loadHistory = function(){
    const historyList = $(".list-group");
    historyList.empty(); // Clear previous history items
    for (let search of searchHistory){
        const historyItem = $("<button>");
        historyItem.addClass("list-group-item", "list-group-item-action");
        historyItem.text(search);
        historyList.append(historyItem);
        historyItem.click(function() {
            searchHistoryValue(search); // Pass the city value associated with this history item
        });
    }
};

window.addEventListener('load', function() {
    // Your function call here
    loadHistory();
});

// Search for city on API 
searchBtnEl.click(function() {
    ApiSearch();
    forecastSearch();
    loadHistory();
});
