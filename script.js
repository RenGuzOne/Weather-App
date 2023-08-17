// DOM Module Pattern
const domManip = (() => {
    const searchButton = document.querySelector(".search-button");
    const clearButton = document.querySelector(".reset-button");
    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
})();

// Async function to fetch current forecast from user inputs
async function fetchCurrentWeather() {
    try {
        const searchCity = document.getElementById("search-city").value;
        const searchState = document.getElementById("search-state").value;
        const searchCountry = document.getElementById("search-country").value;

        //Run check to ensure all fields have values
        if (searchCity == "" || searchState == "" ||searchCountry == "") {
            alert("All fields are required. Please try again!");
            return;
        }

        console.log(searchCity);
        console.log(searchState);
        console.log(searchCountry);

        //Run fetch and wait for response JSON
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=45363809a39e4742b63143856231508 &q=" + 
        searchCity + "," + searchState + "," + searchCountry + 
        "&units=imperial &APPID=45363809a39e4742b63143856231508", {mode: "cors"});
        const currentData = await response.json();
        console.log("Fetching current weather data from the API...", currentData);
        
        //Construct object for my weather app from the API JSON data
        const currentWeather = {
            mainWeather: currentData.weather[0].main,
            place: currentData.name + ", " + searchState.toUpperCase() + " " + currentData.sys.country,
            description: currentData.weather[0].description.replace(/\b\w/g, letter => (letter.toUpperCase())),
            temp: Math.round(currentData.main.temp),
            humidity: currentData.main.humidity + "%",
            wind: Math.round(currentData.wind.speed) + " mph"
        };

        console.log(currentWeather);

    } catch (err) {
        console.log("Something went wrong fetching the current weather data!", err);
    }
}

function clearSearch () {
    document.getElementById("search-city").value = "";
    document.getElementById("search-state").value = "";
    document.getElementById("search-country").value = "";
}