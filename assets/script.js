// GIVEN a weather dashboard with form inputs

    // GLOBAL VARIABLES

    var APIKey = "6ccba9dac9ded6fc0fec4605e4c31d92";
    var city = "";
    var savedCities = [];
    var maxCities = 5;

    var mainCity = document.querySelector(".mainForecastCity");
    var mainImg = document.getElementById("mainImg");
    var mainTemp = document.querySelector(".mainForecastTemp");
    var mainWind = document.querySelector(".mainForecastWind");
    var mainHumidity = document.querySelector(".mainForecastHumidity");
    var mainUV = document.querySelector(".mainForecastUV");

    // Previous city searches div
    var prevCitiesContainer = document.querySelector(".previousSearches");

    // Five day forecast elements
    var day1Date = document.querySelector(".day1Date");
    var day2Date = document.querySelector(".day2Date");
    var day3Date = document.querySelector(".day3Date");
    var day4Date = document.querySelector(".day4Date");
    var day5Date = document.querySelector(".day5Date");

    var day1Img = document.getElementById("day1Img");
    var day2Img = document.getElementById("day2Img");
    var day3Img = document.getElementById("day3Img");
    var day4Img = document.getElementById("day4Img");
    var day5Img = document.getElementById("day5Img");

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

    // Global variable created to access dynamically created buttons
    var cityBtn = "";

$(document).ready(function() {

    // Get value on button click and log value
    $("#searchBtn").click(function(){
        var city = $("#searchInput").val();
        console.log(city);

        savedCities.unshift(city);
        savedCities.splice(maxCities);
        console.log(savedCities);

        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        JSON.parse(localStorage.getItem("savedCities"));

        displaySearchedCities(savedCities);

        function displaySearchedCities(savedCities) {
            prevCitiesContainer.innerHTML = "";

            for (var i = 0; i < savedCities.length; i++) {
                cityBtn = document.createElement('button');
                cityBtn.classList = 'btn btn-outline-secondary prevCityBtn';
                console.log(savedCities[i]);

                cityBtn.textContent = savedCities[i];
                cityBtn.style.display = 'block';
                cityBtn.value = savedCities[i];
                cityBtn.addEventListener('click', reFetch);

                prevCitiesContainer.appendChild(cityBtn);
            }
        }

    // console.log(queryURL);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    console.log(queryURL);

    // API call for one city
    fetch(queryURL)
    .then(function (response) {
        console.log(response.status);
        if (response.ok) {
            // Display searched city name with current date
            mainCity.textContent = city + " (" + moment().format('L') + ")";
        }
        return response.json();
    })
    .then(function (data) {
        // Check that info is coming back correctly
        console.log(data);

        // Grabbing weather icon based on returned data icon value
        var mainImgIcon = data.weather[0].icon;
        var mainIconURL = `http://openweathermap.org/img/wn/${mainImgIcon}@2x.png`;

        // Supplying weather icon image source
        mainImg.src = mainIconURL;

         // Supplying main forecast temperature data
         mainTemp.textContent = "Temp: " + data.main.temp + " °F";
         console.log(data.main.temp);
 
         // Supplying main forecast wind data
         mainWind.textContent = "Wind: " + data.wind.speed + " MPH";
         console.log(data.wind.speed);
 
         // Supplying main forecast humidity data
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
        mainUV.textContent = " " + data.current.uvi

        // UV index background changes based on returned value
        if (data.current.uvi >= 11) {
            mainUV.style.backgroundColor = "purple";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 7 && data.current.uvi < 11) {
            mainUV.style.backgroundColor = "red";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 5 && data.current.uvi < 8) {
            mainUV.style.backgroundColor = "orange";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 2 && data.current.uvi < 6) {
            mainUV.style.backgroundColor = "yellow";
            mainUV.style.color = "black";
        }
        else {
            mainUV.style.backgroundColor = "green";
            mainUV.style.color = "white";
        }
    })

    // Fetch request for five day forecast  in bottom cards
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    console.log(fiveDayURL);

    fetch(fiveDayURL)
    .then(function (response) {
        console.log(response.status);
        // Check if response is good
        if (response.ok) 
        return response.json();
    })
        .then(function (data) {
            // Check that info is coming back correctly
            console.log(data);

            var dayOneImgIcon = data.list[0].weather[0].icon;
            var dayOneIconURL = `http://openweathermap.org/img/wn/${dayOneImgIcon}@2x.png`;
            day1Img.src = dayOneIconURL;

            var dayTwoImgIcon = data.list[1].weather[0].icon;
            var dayTwoIconURL = `http://openweathermap.org/img/wn/${dayTwoImgIcon}@2x.png`;
            day2Img.src = dayTwoIconURL;

            var dayThreeImgIcon = data.list[2].weather[0].icon;
            var dayThreeIconURL = `http://openweathermap.org/img/wn/${dayThreeImgIcon}@2x.png`;
            day3Img.src = dayThreeIconURL;

            var dayFourImgIcon = data.list[3].weather[0].icon;
            var dayFourIconURL = `http://openweathermap.org/img/wn/${dayFourImgIcon}@2x.png`;
            day4Img.src = dayFourIconURL;

            var dayFiveImgIcon = data.list[4].weather[0].icon;
            var dayFiveIconURL = `http://openweathermap.org/img/wn/${dayFiveImgIcon}@2x.png`;
            day5Img.src = dayFiveIconURL;

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
    
    // There was probably an easier way to pass in the saved values, but I just repeated the above code while changing the city value to prevCity.
    var reFetch = function() {
        // Event listener on dynamically created button gets "this" value from the clicked button
        var prevCity = this.value;

        var prevQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + prevCity + "&appid=" + APIKey + "&units=imperial";
        console.log(prevQueryURL);

    fetch(prevQueryURL)
    .then(function (response) {
        console.log(response.status);
        if (response.ok) {
            // Display (previously) searched city name with current date
            mainCity.textContent = prevCity + " (" + moment().format('L') + ")";
        }
        return response.json();
    })
    .then(function (data) {
        // Check that info is coming back correctly
        console.log(data);

        var mainImgIcon = data.weather[0].icon;
        var mainIconURL = `http://openweathermap.org/img/wn/${mainImgIcon}@2x.png`;

        // Supplying weather icon image source
        mainImg.src = mainIconURL;

        // Supplying main forecast temperature data
        mainTemp.textContent = "Temp: " + data.main.temp + " °F";
        console.log(data.main.temp);

        // Supplying main forecast wind data
        mainWind.textContent = "Wind: " + data.wind.speed + " MPH";
        console.log(data.wind.speed);

        // Supplying main forecast humidity data
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
        mainUV.textContent = " " + data.current.uvi

        // UV index background changes based on returned value
        if (data.current.uvi >= 11) {
            mainUV.style.backgroundColor = "purple";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 7 && data.current.uvi < 11) {
            mainUV.style.backgroundColor = "red";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 5 && data.current.uvi < 8) {
            mainUV.style.backgroundColor = "orange";
            mainUV.style.color = "white";
        }
        else if (data.current.uvi > 2 && data.current.uvi < 6) {
            mainUV.style.backgroundColor = "yellow";
            mainUV.style.color = "black";
        }
        else {
            mainUV.style.backgroundColor = "green";
            mainUV.style.color = "white";
        }
    })

    // Fetch request for five day forecast in bottom cards
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + prevCity + "&appid=" + APIKey + "&units=imperial";
    console.log(fiveDayURL);

    fetch(fiveDayURL)
    .then(function (response) {
        console.log(response.status);
        if (response.ok) 
        return response.json();
    })
        .then(function (data) {
            // Check that info is coming back correctly
            console.log(data);

            // Supplying image icon sources for the five different cards
            var dayOneImgIcon = data.list[0].weather[0].icon;
            var dayOneIconURL = `http://openweathermap.org/img/wn/${dayOneImgIcon}@2x.png`;
            day1Img.src = dayOneIconURL;

            var dayTwoImgIcon = data.list[1].weather[0].icon;
            var dayTwoIconURL = `http://openweathermap.org/img/wn/${dayTwoImgIcon}@2x.png`;
            day2Img.src = dayTwoIconURL;

            var dayThreeImgIcon = data.list[2].weather[0].icon;
            var dayThreeIconURL = `http://openweathermap.org/img/wn/${dayThreeImgIcon}@2x.png`;
            day3Img.src = dayThreeIconURL;

            var dayFourImgIcon = data.list[3].weather[0].icon;
            var dayFourIconURL = `http://openweathermap.org/img/wn/${dayFourImgIcon}@2x.png`;
            day4Img.src = dayFourIconURL;

            var dayFiveImgIcon = data.list[4].weather[0].icon;
            var dayFiveIconURL = `http://openweathermap.org/img/wn/${dayFiveImgIcon}@2x.png`;
            day5Img.src = dayFiveIconURL;

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
    };
  }
);
