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
    const weatherEl = $("#weather")

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
        console.log("data", data);
        if (data.weather[0].main === "Clouds"){
            weatherEl.text("☁️")
        }
        else if (data.weather[0].main === "Clear"){
            weatherEl.text("☀️")
        }
        else if (data.weather[0].main === "Rain"){
            weatherEl.text("🌧️")
        }
        else {
            weatherEl.text("🌩️")
        }
        resultEl.text(`${data.name}`);
        tempEl.text(`Temp: ${data.main.temp}°F`);
        windEl.text(`Wind: ${data.wind.speed}mph`);
        humidityEl.text(`Humidity: ${data.main.humidity}%`);
        searchHistory.unshift(data.name);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        loadHistory();
        
    })
}     

let forecastSearch = function(){
    let cityInput = $("#City");
    let cityVal = cityInput.val();
    const day1El = $("#day1");
    const day2El = $("#day2");
    const day3El = $("#day3");
    const day4El = $("#day4");
    const day5El = $("#day5");


    const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&appid=${apiKey}&units=imperial`;
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
        console.log("forecast data", data)
        //day 1
        const day1Sky = $("<h2>");
        if (data.list[2].weather[0].main === "Clouds"){
            day1Sky.text("☁️")
        }
        else if (data.list[2].weather[0].main === "Clear"){
            day1Sky.text("☀️")
        }
        else if (data.list[2].weather[0].main === "Rain"){
            day1Sky.text("🌧️")
        }
        else {
            day1Sky.text("🌩️")
        }
        day1El.append(day1Sky);

        const day1Temp = $("<p>")
        day1Temp.text(`Temperature: ${data.list[2].main.temp}°F`);
        day1El.append(day1Temp);

        const day1Wind = $("<p>");
        day1Wind.text(`Wind: ${data.list[2].wind.speed} mph`);
        day1El.append(day1Wind);

        const day1humidity = $("<p>")
        day1humidity.text(`Humidity: ${data.list[2].main.humidity} %`);
        day1El.append(day1humidity);

        //day 2
        const day2Sky = $("<h2>");
        if (data.list[10].weather[0].main === "Clouds"){
            day2Sky.text("☁️")
        }
        else if (data.list[10].weather[0].main === "Clear"){
            day2Sky.text("☀️")
        }
        else if (data.list[10].weather[0].main === "Rain"){
            day2Sky.text("🌧️")
        }
        else {
            day2Sky.text("🌩️")
        }
        day2El.append(day2Sky);

        const day2Temp = $("<p>")
        day2Temp.text(`Temperature: ${data.list[10].main.temp}°F`);
        day2El.append(day2Temp);

        const day2Wind = $("<p>");
        day2Wind.text(`Wind: ${data.list[10].wind.speed} mph`);
        day2El.append(day2Wind);

        const day2humidity = $("<p>")
        day2humidity.text(`Humidity: ${data.list[10].main.humidity} %`);
        day2El.append(day2humidity);

        //day 3
        const day3Sky = $("<h2>");
        if (data.list[18].weather[0].main === "Clouds"){
            day3Sky.text("☁️")
        }
        else if (data.list[18].weather[0].main === "Clear"){
            day3Sky.text("☀️")
        }
        else if (data.list[18].weather[0].main === "Rain"){
            day3Sky.text("🌧️")
        }
        else {
            day3Sky.text("🌩️")
        }
        day3El.append(day3Sky);

        const day3Temp = $("<p>");
        day3Temp.text(`Temperature: ${data.list[18].main.temp}°F`);
        day3El.append(day3Temp);

        const day3Wind = $("<p>");
        day3Wind.text(`Wind: ${data.list[18].wind.speed} mph`);
        day3El.append(day3Wind);

        const day3humidity = $("<p>");
        day3humidity.text(`Humidity: ${data.list[18].main.humidity} %`);
        day3El.append(day3humidity);

        //day 4
        const day4Sky = $("<h2>");
        if (data.list[26].weather[0].main === "Clouds"){
            day4Sky.text("☁️")
        }
        else if (data.list[26].weather[0].main === "Clear"){
            day4Sky.text("☀️")
        }
        else if (data.list[26].weather[0].main === "Rain"){
            day4Sky.text("🌧️")
        }
        else {
            day4Sky.text("🌩️")
        }
        day4El.append(day4Sky);

        const day4Temp = $("<p>");
        day4Temp.text(`Temperature: ${data.list[26].main.temp}°F`);
        day4El.append(day4Temp);

        const day4Wind = $("<p>");
        day4Wind.text(`Wind: ${data.list[26].wind.speed} mph`);
        day4El.append(day4Wind);

        const day4humidity = $("<p>");
        day4humidity.text(`Humidity: ${data.list[26].main.humidity} %`);
        day4El.append(day4humidity);


        //day 5
        const day5Sky = $("<h2>");
        if (data.list[34].weather[0].main === "Clouds"){
            day5Sky.text("☁️")
        }
        else if (data.list[34].weather[0].main === "Clear"){
            day5Sky.text("☀️")
        }
        else if (data.list[34].weather[0].main === "Rain"){
            day5Sky.text("🌧️")
        }
        else {
            day5Sky.text("🌩️")
        }
        day5El.append(day5Sky);

        const day5Temp = $("<p>");
        day5Temp.text(`Temperature: ${data.list[34].main.temp}°F`);
        day5El.append(day5Temp);;

        const day5Wind = $("<p>");
        day5Wind.text(`Wind: ${data.list[34].wind.speed} mph`);
        day5El.append(day5Wind);

        const day5humidity = $("<p>");
        day5humidity.text(`Humidity: ${data.list[34].main.humidity} %`);
        day5El.append(day5humidity);


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
    forecastSearch()
    loadHistory();
});

