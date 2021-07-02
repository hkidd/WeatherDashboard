// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    // Using text input/submit, reach out to the Open Weather API and return the weather conditions for the requested city.


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