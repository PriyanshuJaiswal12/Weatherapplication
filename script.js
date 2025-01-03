let inputBox = document.querySelector(".input-box");
let searchBtn = document.querySelector("button");
let weatherImg = document.querySelector(".weather-img");
let temp = document.querySelector(".degree");
let desp = document.querySelector(".description ");
let humidity = document.querySelector(".humidity span");
let wind = document.querySelector(".wind span");
let locationNotfound = document.querySelector(".location-not-found");
let weatherBody = document.querySelector(".weather-body");
let header = document.querySelector("header");

let url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"


async function checkWeather(city) {
    let api_key = "e7cb319bd8b1e70fa5fe90f557569a96";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weatherData = await fetch(`${url}`)
        .then((resp) => resp.json());   //To convert the data into json format
    console.log(weatherData);

    if (weatherData.cod == '404') {
        locationNotfound.style.display = "flex";
        weatherBody.style.display = "none";
        header.style.display = "none";
        return;
    }
    header.style.display = "none";
    locationNotfound.style.display = "none";
    weatherBody.style.display = "flex";
    temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

    desp.innerHTML = weatherData.weather[0].description;

    humidity.innerHTML = `${weatherData.main.humidity}%`

    wind.innerHTML = `${weatherData.wind.speed}Km/H`



    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "assets/clear.png";
            break;
        case 'Mist':
            weatherImg.src = "assets/mist.png";
            break;
        case 'Rain':
            weatherImg.src = "assets/rain.png";
            break;
        case 'Snow':
            weatherImg.src = "assets/snow.png";
            break;
    };
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);

});