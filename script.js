// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    // Using text input/submit, reach out to the Open Weather API and return the weather conditions for the requested city.

    var APIKey = "6ccba9dac9ded6fc0fec4605e4c31d92";
    var city = "";

// API call for one city

$(document).ready(function(){

    var mainCity = document.querySelector(".mainForecastCity");
    var mainImg = document.getElementById("mainImg");
    var mainTemp = document.querySelector(".mainForecastTemp");
    var mainWind = document.querySelector(".mainForecastWind");
    var mainHumidity = document.querySelector(".mainForecastHumidity");
    var mainUV = document.querySelector(".mainForecastUV");

    // Five day forecast elements
    var day1Date = document.querySelector(".day1Date");
    var day2Date = document.querySelector(".day2Date");
    var day3Date = document.querySelector(".day3Date");
    var day4Date = document.querySelector(".day4Date");
    var day5Date = document.querySelector(".day5Date");

    var day1Img = document.querySelector(".day1Img");
    var day2Img = document.querySelector(".day2Img");
    var day3Img = document.querySelector(".day3Img");
    var day4Img = document.querySelector(".day4Img");
    var day5Img = document.querySelector(".day5Img");

    var day1Temp = document.querySelector(".day1Temp");
    var day2Temp = document.querySelector(".day2Temp");
    var day3Temp = document.querySelector(".day3Temp");
    var day4Temp = document.querySelector(".day4Temp");
    var day5Temp = document.querySelector(".day5Temp");

    var day1Wind = document.querySelector(".day1Wind");
    var day2Wind = document.querySelector(".day2Wind");
    var day3Wind = document.querySelector(".day3Wind");
    var day4Wind = document.querySelector(".day4Wind");
    var day5Wind = document.querySelector(".day5Wind");

    var day1Humid = document.querySelector(".day1Humid");
    var day2Humid = document.querySelector(".day2Humid");
    var day3Humid = document.querySelector(".day3Humid");
    var day4Humid = document.querySelector(".day4Humid");
    var day5Humid = document.querySelector(".day5Humid");

    // Get value on button click and log value
    $("#searchBtn").click(function(){
        var city = $("#searchInput").val();
        // console.log(searchTerm);
        console.log(city);

        // console.log(queryURL);
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
        console.log(queryURL);

    fetch(queryURL)
    .then(function (response) {
        console.log(response.status);
        // Check if response is good
        if (response.ok) {
            mainCity.textContent = city + " (" + moment().format('L') + ")";

        }
        return response.json();
    })
    .then(function (data) {
        // Check that info is coming back correctly
        console.log(data);

        var mainImgIcon = data.weather[0].icon;
        var mainIconURL = `http://openweathermap.org/img/wn/${mainImgIcon}@2x.png`;

        mainImg.src = mainIconURL;

        mainTemp.textContent = "Temp: " + data.main.temp + " °F";
        console.log(data.main.temp);

        mainWind.textContent = "Wind: " + data.wind.speed + " MPH";
        console.log(data.wind.speed);

        mainHumidity.textContent = "Humidity: " + data.main.humidity + " %";
        console.log(data.main.humidity);

        // Varaiables for the latitude and longitude initialized
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        // Nested fetch function to take the latitude and longitude to use for the OneCall API (only way to get the UV Index)
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial");
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        // UV Index returned from the OneCall and passed into the mainUV html element
        mainUV.textContent = "UV Index: " +  data.current.uvi
    })

    // Fetch request for five day forecast

    // console.log(fiveDayURL);
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    console.log(fiveDayURL);

    fetch(fiveDayURL)
    .then(function (response) {
        console.log(response.status);
        // Check if response is good
        if (response.ok) {
            mainCity.textContent = city + " (" + moment().format('L') + ")";

        }
        return response.json();
    })
        .then(function (data) {
            // Check that info is coming back correctly
            console.log(data);

            // Five day forecast values passed in for each card

            day1Date.textContent = moment().format('L');
            day2Date.textContent = moment().add(1, 'days').format('L');
            day3Date.textContent = moment().add(2, 'days').format('L');
            day4Date.textContent = moment().add(3, 'days').format('L');
            day5Date.textContent = moment().add(4, 'days').format('L');

            day1Temp.textContent = "Temp: " + data.list[0].main.temp + " °F";
            day2Temp.textContent = "Temp: " + data.list[1].main.temp + " °F";
            day3Temp.textContent = "Temp: " + data.list[2].main.temp + " °F";
            day4Temp.textContent = "Temp: " + data.list[3].main.temp + " °F";
            day5Temp.textContent = "Temp: " + data.list[4].main.temp + " °F";

            day1Wind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
            day2Wind.textContent = "Wind: " + data.list[1].wind.speed + " MPH";
            day3Wind.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
            day4Wind.textContent = "Wind: " + data.list[3].wind.speed + " MPH";
            day5Wind.textContent = "Wind: " + data.list[4].wind.speed + " MPH";

            day1Humid.textContent = "Humidity: " + data.list[0].main.humidity + " %";
            day2Humid.textContent = "Humidity: " + data.list[1].main.humidity + " %";
            day3Humid.textContent = "Humidity: " + data.list[2].main.humidity + " %";
            day4Humid.textContent = "Humidity: " + data.list[3].main.humidity + " %";
            day5Humid.textContent = "Humidity: " + data.list[4].main.humidity + " %";
        })

    });

     // This data then needs to be appended to the page and saved to local storage
});

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    // Using the Open Weather API's, pull the various weather info required and update the HTML/text content with that info


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    // The UV index HTML element will change colors depending on how high the number is (similar to work day planner)


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    // Bootstrap cards along bottom of page will show the 5-day forecast


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
    // A list of the previous five searches is saved along the left side.  When clicked, the weather info is pulled again similar to the initial search.