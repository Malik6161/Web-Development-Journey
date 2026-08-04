// ==========================================
// ATMOS - WEATHER INTELLIGENCE
// ==========================================

// API ENDPOINTS
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const AIR_QUALITY_API = "https://air-quality-api.open-meteo.com/v1/air-quality";


// ==========================================
// DOM ELEMENTS
// ==========================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const themeBtn = document.getElementById("themeBtn");
const unitToggle = document.getElementById("unitToggle");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const localDate = document.getElementById("localDate");
const localTime = document.getElementById("localTime");

const temperature = document.getElementById("temperature");
const temperatureUnit = document.getElementById("temperatureUnit");
const feelsLike = document.getElementById("feelsLike");

const weatherIcon = document.getElementById("weatherIcon");
const weatherCondition = document.getElementById("weatherCondition");
const weatherDescription = document.getElementById("weatherDescription");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");

const outdoorScore = document.getElementById("outdoorScore");
const outdoorProgress = document.getElementById("outdoorProgress");
const outdoorMessage = document.getElementById("outdoorMessage");

const comfortIndex = document.getElementById("comfortIndex");
const comfortMessage = document.getElementById("comfortMessage");

const uvIndex = document.getElementById("uvIndex");
const uvMessage = document.getElementById("uvMessage");

const airQuality = document.getElementById("airQuality");
const airQualityMessage = document.getElementById("airQualityMessage");

const recommendationTitle = document.getElementById("recommendationTitle");
const recommendationText = document.getElementById("recommendationText");

const rainRecommendation = document.getElementById("rainRecommendation");
const rainMessage = document.getElementById("rainMessage");

const hourlyForecast = document.getElementById("hourlyForecast");
const weeklyForecast = document.getElementById("weeklyForecast");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const favoriteCities = document.getElementById("favoriteCities");

const searchSuggestions = document.getElementById("searchSuggestions");
const recentSearches = document.getElementById("recentSearches");

const loadingScreen = document.getElementById("loadingScreen");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const retryBtn = document.getElementById("retryBtn");

const alertTitle = document.getElementById("alertTitle");
const alertMessage = document.getElementById("alertMessage");


// ==========================================
// APPLICATION STATE
// ==========================================

let currentWeatherData = null;
let currentLocation = null;

let currentUnit = "C";

let favorites = JSON.parse(
    localStorage.getItem("atmosFavorites")
) || [];

let recentCities = JSON.parse(
    localStorage.getItem("atmosRecentCities")
) || [];


// ==========================================
// WEATHER CODE INFORMATION
// ==========================================

const weatherCodes = {

    0: {
        condition: "Clear Sky",
        description: "Perfect clear conditions",
        icon: "☀️",
        type: "sunny"
    },

    1: {
        condition: "Mainly Clear",
        description: "Mostly clear skies",
        icon: "🌤️",
        type: "sunny"
    },

    2: {
        condition: "Partly Cloudy",
        description: "Some clouds in the sky",
        icon: "⛅",
        type: "cloudy"
    },

    3: {
        condition: "Overcast",
        description: "Cloudy throughout the sky",
        icon: "☁️",
        type: "cloudy"
    },

    45: {
        condition: "Fog",
        description: "Reduced visibility due to fog",
        icon: "🌫️",
        type: "cloudy"
    },

    48: {
        condition: "Freezing Fog",
        description: "Freezing fog conditions",
        icon: "🌫️",
        type: "cloudy"
    },

    51: {
        condition: "Light Drizzle",
        description: "Light drizzle",
        icon: "🌦️",
        type: "rainy"
    },

    53: {
        condition: "Drizzle",
        description: "Moderate drizzle",
        icon: "🌦️",
        type: "rainy"
    },

    55: {
        condition: "Heavy Drizzle",
        description: "Heavy drizzle",
        icon: "🌧️",
        type: "rainy"
    },

    61: {
        condition: "Light Rain",
        description: "Light rainfall",
        icon: "🌦️",
        type: "rainy"
    },

    63: {
        condition: "Rain",
        description: "Moderate rainfall",
        icon: "🌧️",
        type: "rainy"
    },

    65: {
        condition: "Heavy Rain",
        description: "Heavy rainfall",
        icon: "🌧️",
        type: "rainy"
    },

    71: {
        condition: "Light Snow",
        description: "Light snowfall",
        icon: "🌨️",
        type: "snowy"
    },

    73: {
        condition: "Snow",
        description: "Moderate snowfall",
        icon: "❄️",
        type: "snowy"
    },

    75: {
        condition: "Heavy Snow",
        description: "Heavy snowfall",
        icon: "❄️",
        type: "snowy"
    },

    80: {
        condition: "Rain Showers",
        description: "Passing rain showers",
        icon: "🌦️",
        type: "rainy"
    },

    81: {
        condition: "Heavy Showers",
        description: "Heavy rain showers",
        icon: "🌧️",
        type: "rainy"
    },

    82: {
        condition: "Violent Showers",
        description: "Very heavy rain showers",
        icon: "⛈️",
        type: "stormy"
    },

    95: {
        condition: "Thunderstorm",
        description: "Thunderstorm activity",
        icon: "⛈️",
        type: "stormy"
    },

    96: {
        condition: "Thunderstorm + Hail",
        description: "Thunderstorm with hail",
        icon: "⛈️",
        type: "stormy"
    },

    99: {
        condition: "Severe Thunderstorm",
        description: "Thunderstorm with heavy hail",
        icon: "⛈️",
        type: "stormy"
    }

};


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadSavedTheme();

    renderFavorites();

    renderRecentSearches();

    loadDefaultWeather();

    updateClock();

    setInterval(updateClock, 1000);
});


// ==========================================
// DEFAULT WEATHER
// ==========================================

async function loadDefaultWeather() {

    showLoading();

    try {

        const savedCity =
            localStorage.getItem("atmosLastCity");

        if (savedCity) {

            const location = JSON.parse(savedCity);

            await getWeather(
                location.latitude,
                location.longitude,
                location.name,
                location.country
            );

        } else {

            await getWeather(
                31.4504,
                73.1350,
                "Faisalabad",
                "Pakistan"
            );

        }

    } catch (error) {

        showError(
            "Unable to load weather information."
        );

    }

}


// ==========================================
// SEARCH CITY
// ==========================================

async function searchCity() {

    const query = cityInput.value.trim();

    if (!query) {
        cityInput.focus();
        return;
    }

    showLoading();

    try {

        const response = await fetch(
            `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );

        if (!response.ok) {
            throw new Error("Location search failed");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found");
        }

        const location = data.results[0];

        await getWeather(
            location.latitude,
            location.longitude,
            location.name,
            location.country
        );

        saveRecentCity({
            name: location.name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude
        });

        cityInput.value = "";

        hideSuggestions();

    } catch (error) {

        showError(
            "We couldn't find that location. Try another city."
        );

    }

}


// ==========================================
// GET WEATHER DATA
// ==========================================

async function getWeather(
    latitude,
    longitude,
    name,
    country
) {

    showLoading();

    currentLocation = {
        latitude,
        longitude,
        name,
        country
    };

    try {

        const temperatureUnit =
            currentUnit === "C"
                ? "celsius"
                : "fahrenheit";

        const weatherURL =
            `${WEATHER_API}?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility` +
            `&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,relative_humidity_2m,uv_index` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,precipitation_sum` +
            `&temperature_unit=${temperatureUnit}` +
            `&wind_speed_unit=kmh` +
            `&timezone=auto` +
            `&forecast_days=7`;

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather request failed");
        }

        const data = await response.json();

        currentWeatherData = data;

        updateLocation(name, country);

        updateCurrentWeather(data);

        updateHourlyForecast(data);

        updateWeeklyForecast(data);

        updateSunInformation(data);

        updateSmartInsights(data);

        updateRecommendations(data);

        updateWeatherTheme(data);

        updateWeatherAlert(data);

        saveLastCity();

        await getAirQuality(latitude, longitude);

        hideLoading();

    } catch (error) {

        console.error(error);

        showError(
            "Weather data could not be loaded. Please try again."
        );

    }

}


// ==========================================
// UPDATE LOCATION
// ==========================================

function updateLocation(name, country) {

    cityName.textContent = name;

    countryName.textContent = country;

}


// ==========================================
// CURRENT WEATHER
// ==========================================

function updateCurrentWeather(data) {

    const current = data.current;

    const code = weatherCodes[current.weather_code]
        || weatherCodes[0];

    temperature.textContent =
        Math.round(current.temperature_2m);

    temperatureUnit.textContent =
        currentUnit;

    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°`;

    weatherIcon.textContent = code.icon;

    weatherCondition.textContent =
        code.condition;

    weatherDescription.textContent =
        code.description;

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

    windSpeed.textContent =
        `${Math.round(current.wind_speed_10m)} km/h`;

    visibility.textContent =
        `${(current.visibility / 1000).toFixed(1)} km`;

    pressure.textContent =
        `${Math.round(current.surface_pressure)} hPa`;

}


// ==========================================
// HOURLY FORECAST
// ==========================================

function updateHourlyForecast(data) {

    hourlyForecast.innerHTML = "";

    const currentHour =
        new Date().getHours();

    const times = data.hourly.time;

    let startIndex = times.findIndex(time => {

        const hour =
            new Date(time).getHours();

        return hour >= currentHour;

    });

    if (startIndex < 0) {
        startIndex = 0;
    }

    for (
        let i = startIndex;
        i < Math.min(startIndex + 12, times.length);
        i++
    ) {

        const date = new Date(times[i]);

        const hour =
            date.toLocaleTimeString([], {
                hour: "numeric"
            });

        const code =
            weatherCodes[data.hourly.weather_code[i]]
            || weatherCodes[0];

        const temp =
            Math.round(data.hourly.temperature_2m[i]);

        const rainChance =
            data.hourly.precipitation_probability[i] || 0;

        const card =
            document.createElement("div");

        card.className =
            `hourly-card ${i === startIndex ? "active" : ""}`;

        card.innerHTML = `
            <div class="time">
                ${i === startIndex ? "Now" : hour}
            </div>

            <div class="icon">
                ${code.icon}
            </div>

            <div class="temp">
                ${temp}°${currentUnit}
            </div>

            <div class="rain-chance">
                💧 ${rainChance}%
            </div>
        `;

        hourlyForecast.appendChild(card);
    }

    drawTemperatureChart(data, startIndex);

}


// ==========================================
// WEEKLY FORECAST
// ==========================================

function updateWeeklyForecast(data) {

    weeklyForecast.innerHTML = "";

    const days =
        data.daily.time;

    for (let i = 0; i < days.length; i++) {

        const date =
            new Date(days[i]);

        const dayName =
            i === 0
                ? "Today"
                : date.toLocaleDateString(
                    [],
                    { weekday: "short" }
                );

        const code =
            weatherCodes[data.daily.weather_code[i]]
            || weatherCodes[0];

        const maxTemp =
            Math.round(
                data.daily.temperature_2m_max[i]
            );

        const minTemp =
            Math.round(
                data.daily.temperature_2m_min[i]
            );

        const rainChance =
            data.daily.precipitation_probability_max[i]
            || 0;

        const card =
            document.createElement("div");

        card.className = "week-card";

        card.innerHTML = `
            <div class="week-day">
                ${dayName}
            </div>

            <div class="week-condition">
                <span class="week-icon">
                    ${code.icon}
                </span>

                <span>
                    ${code.condition}
                </span>
            </div>

            <div class="week-temp">
                <strong>
                    ${maxTemp}°${currentUnit}
                </strong>

                <span>
                    ${minTemp}°
                </span>
            </div>

            <div class="week-rain">
                💧 ${rainChance}% rain
            </div>

            <div>
                ${formatDate(days[i])}
            </div>
        `;

        weeklyForecast.appendChild(card);
    }

}


// ==========================================
// SUNRISE / SUNSET
// ==========================================

function updateSunInformation(data) {

    sunrise.textContent =
        formatTime(data.daily.sunrise[0]);

    sunset.textContent =
        formatTime(data.daily.sunset[0]);

}


// ==========================================
// SMART WEATHER INSIGHTS
// ==========================================

function updateSmartInsights(data) {

    const current =
        data.current;

    const temp =
        current.temperature_2m;

    const humidityValue =
        current.relative_humidity_2m;

    const rain =
        current.precipitation;

    const uv =
        data.daily.uv_index_max[0] || 0;


    // OUTDOOR SCORE

    let score = 100;

    if (temp < 5 || temp > 38) {
        score -= 30;
    } else if (temp < 12 || temp > 32) {
        score -= 15;
    }

    if (humidityValue > 80) {
        score -= 15;
    }

    if (rain > 0) {
        score -= 20;
    }

    if (uv >= 8) {
        score -= 10;
    }

    score =
        Math.max(0, Math.min(100, score));

    outdoorScore.textContent =
        score;

    outdoorProgress.style.width =
        `${score}%`;

    if (score >= 80) {

        outdoorMessage.textContent =
            "Excellent conditions for outdoor activities.";

    } else if (score >= 60) {

        outdoorMessage.textContent =
            "Good conditions with a few things to consider.";

    } else {

        outdoorMessage.textContent =
            "Outdoor conditions may be uncomfortable.";

    }


    // COMFORT INDEX

    let comfort =
        100 -
        Math.abs(temp - 22) * 2 -
        Math.max(0, humidityValue - 50) * 0.4;

    comfort =
        Math.max(0, Math.min(100, Math.round(comfort)));

    comfortIndex.textContent =
        comfort;

    if (comfort >= 80) {

        comfortMessage.textContent =
            "Very comfortable atmospheric conditions.";

    } else if (comfort >= 60) {

        comfortMessage.textContent =
            "Generally comfortable conditions.";

    } else {

        comfortMessage.textContent =
            "Conditions may feel uncomfortable.";

    }


    // UV INDEX

    uvIndex.textContent =
        uv.toFixed(1);

    if (uv < 3) {

        uvMessage.textContent =
            "Low UV exposure. Normal protection is enough.";

    } else if (uv < 6) {

        uvMessage.textContent =
            "Moderate UV. Consider sun protection.";

    } else if (uv < 8) {

        uvMessage.textContent =
            "High UV. Use sunscreen and seek shade.";

    } else {

        uvMessage.textContent =
            "Very high UV. Extra protection is recommended.";

    }

}


// ==========================================
// AIR QUALITY
// ==========================================

async function getAirQuality(
    latitude,
    longitude
) {

    try {

        const url =
            `${AIR_QUALITY_API}?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=pm10,pm2_5,us_aqi` +
            `&timezone=auto`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Air quality unavailable");
        }

        const data =
            await response.json();

        const aqi =
            data.current.us_aqi;

        airQuality.textContent =
            aqi ?? "--";

        if (aqi <= 50) {

            airQualityMessage.textContent =
                "Good air quality.";

        } else if (aqi <= 100) {

            airQualityMessage.textContent =
                "Moderate air quality.";

        } else if (aqi <= 150) {

            airQualityMessage.textContent =
                "Sensitive groups should take care.";

        } else {

            airQualityMessage.textContent =
                "Poor air quality. Limit outdoor exposure.";

        }

    } catch (error) {

        airQuality.textContent = "--";

        airQualityMessage.textContent =
            "Air quality data unavailable.";

    }

}


// ==========================================
// SMART RECOMMENDATIONS
// ==========================================

function updateRecommendations(data) {

    const current =
        data.current;

    const temp =
        current.temperature_2m;

    const rain =
        data.daily.precipitation_probability_max[0] || 0;


    // CLOTHING

    if (temp < 8) {

        recommendationTitle.textContent =
            "Heavy layers recommended";

        recommendationText.textContent =
            "It's cold outside. Wear a warm jacket or coat with multiple layers.";

    } else if (temp < 16) {

        recommendationTitle.textContent =
            "Light jacket recommended";

        recommendationText.textContent =
            "Cool conditions are expected. A light jacket should keep you comfortable.";

    } else if (temp < 25) {

        recommendationTitle.textContent =
            "Comfortable clothing";

        recommendationText.textContent =
            "The temperature is comfortable. Light everyday clothing should work well.";

    } else if (temp < 32) {

        recommendationTitle.textContent =
            "Light clothing recommended";

        recommendationText.textContent =
            "It's getting warm. Choose breathable and lightweight clothing.";

    } else {

        recommendationTitle.textContent =
            "Stay cool";

        recommendationText.textContent =
            "Hot conditions are expected. Wear loose, breathable clothing and stay hydrated.";

    }


    // RAIN ADVISOR

    if (rain >= 70) {

        rainRecommendation.textContent =
            "Definitely take an umbrella ☂️";

        rainMessage.textContent =
            `There is a ${rain}% chance of precipitation today.`;

    } else if (rain >= 40) {

        rainRecommendation.textContent =
            "An umbrella might be useful";

        rainMessage.textContent =
            `There is a ${rain}% chance of rain.`;

    } else {

        rainRecommendation.textContent =
            "You probably don't need an umbrella";

        rainMessage.textContent =
            `Only a ${rain}% chance of precipitation today.`;

    }

}


// ==========================================
// DYNAMIC WEATHER THEME
// ==========================================

function updateWeatherTheme(data) {

    const current =
        data.current;

    const code =
        weatherCodes[current.weather_code]
        || weatherCodes[0];

    document.body.classList.remove(
        "sunny",
        "cloudy",
        "rainy",
        "snowy",
        "stormy",
        "night"
    );

    document.body.classList.add(code.type);

    if (current.is_day === 0) {

        document.body.classList.remove(
            "sunny",
            "cloudy"
        );

        document.body.classList.add("night");

    }

}


// ==========================================
// WEATHER ALERT
// ==========================================

function updateWeatherAlert(data) {

    const current =
        data.current;

    const code =
        current.weather_code;

    if (code >= 95) {

        alertTitle.textContent =
            "Thunderstorm conditions";

        alertMessage.textContent =
            "Thunderstorm activity is currently detected. Consider staying indoors.";

        return;
    }

    if (current.wind_speed_10m >= 50) {

        alertTitle.textContent =
            "Strong winds detected";

        alertMessage.textContent =
            "Wind speeds are currently high. Take care outdoors.";

        return;
    }

    if (data.daily.uv_index_max[0] >= 10) {

        alertTitle.textContent =
            "Very high UV index";

        alertMessage.textContent =
            "Limit direct sun exposure and use strong sun protection.";

        return;
    }

    alertTitle.textContent =
        "No active alerts";

    alertMessage.textContent =
        "There are currently no severe weather alerts.";

}


// ==========================================
// TEMPERATURE CHART
// ==========================================

function drawTemperatureChart(
    data,
    startIndex
) {

    const canvas =
        document.getElementById("temperatureChart");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const container =
        canvas.parentElement;

    const width =
        container.clientWidth;

    const height =
        container.clientHeight;

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    ctx.scale(ratio, ratio);

    const temperatures =
        data.hourly.temperature_2m.slice(
            startIndex,
            startIndex + 12
        );

    if (!temperatures.length) return;

    const min =
        Math.min(...temperatures) - 2;

    const max =
        Math.max(...temperatures) + 2;

    const padding = 25;

    const chartWidth =
        width - padding * 2;

    const chartHeight =
        height - padding * 2;

    const points =
        temperatures.map((temp, index) => {

            const x =
                padding +
                (index /
                    (temperatures.length - 1)) *
                chartWidth;

            const y =
                padding +
                ((max - temp) /
                    (max - min)) *
                chartHeight;

            return { x, y, temp };

        });


    // AREA GRADIENT

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );

    gradient.addColorStop(
        0,
        "rgba(93, 220, 255, 0.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(93, 220, 255, 0)"
    );


    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {

            ctx.moveTo(
                point.x,
                point.y
            );

        } else {

            ctx.lineTo(
                point.x,
                point.y
            );

        }

    });

    ctx.lineTo(
        points[points.length - 1].x,
        height - padding
    );

    ctx.lineTo(
        points[0].x,
        height - padding
    );

    ctx.closePath();

    ctx.fillStyle =
        gradient;

    ctx.fill();


    // LINE

    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {

            ctx.moveTo(
                point.x,
                point.y
            );

        } else {

            ctx.lineTo(
                point.x,
                point.y
            );

        }

    });

    ctx.strokeStyle =
        "#5ddcff";

    ctx.lineWidth = 3;

    ctx.lineJoin = "round";

    ctx.stroke();


    // POINTS

    points.forEach(point => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#5ddcff";

        ctx.fill();

    });

}


// ==========================================
// GEOLOCATION
// ==========================================

function getUserLocation() {

    if (!navigator.geolocation) {

        showError(
            "Geolocation is not supported by your browser."
        );

        return;

    }

    showLoading();

    navigator.geolocation.getCurrentPosition(

        async position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            try {

                const response =
                    await fetch(
                        `${GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
                    );

                const data =
                    await response.json();

                const location =
                    data.results?.[0];

                await getWeather(
                    latitude,
                    longitude,
                    location?.name || "Your Location",
                    location?.country || ""
                );

            } catch (error) {

                await getWeather(
                    latitude,
                    longitude,
                    "Your Location",
                    ""
                );

            }

        },

        error => {

            hideLoading();

            showError(
                "Location access was denied. Please allow location access and try again."
            );

        }

    );

}


// ==========================================
// FAVORITES
// ==========================================

function renderFavorites() {

    favoriteCities.innerHTML = "";

    if (favorites.length === 0) {

        favoriteCities.innerHTML = `
            <div class="favorite-city">
                <h3>No favorite cities</h3>
                <p>Add cities to quickly access them.</p>
            </div>
        `;

        return;
    }

    favorites.forEach(city => {

        const card =
            document.createElement("div");

        card.className =
            "favorite-city";

        card.innerHTML = `
            <div class="city-icon">
                🌤️
            </div>

            <h3>
                ${city.name}
            </h3>

            <p>
                ${city.country}
            </p>

            <div class="city-temperature">
                View Weather
            </div>
        `;

        card.addEventListener(
            "click",
            () => {

                getWeather(
                    city.latitude,
                    city.longitude,
                    city.name,
                    city.country
                );

            }
        );

        favoriteCities.appendChild(card);

    });

}


function addFavoriteCity() {

    if (!currentLocation) return;

    const alreadyExists =
        favorites.some(city =>
            city.name === currentLocation.name
        );

    if (alreadyExists) {

        return;

    }

    favorites.push(currentLocation);

    localStorage.setItem(
        "atmosFavorites",
        JSON.stringify(favorites)
    );

    renderFavorites();

}


// ==========================================
// RECENT SEARCHES
// ==========================================

function saveRecentCity(city) {

    recentCities =
        recentCities.filter(
            item =>
                item.name.toLowerCase() !==
                city.name.toLowerCase()
        );

    recentCities.unshift(city);

    recentCities =
        recentCities.slice(0, 5);

    localStorage.setItem(
        "atmosRecentCities",
        JSON.stringify(recentCities)
    );

    renderRecentSearches();

}


function renderRecentSearches() {

    recentSearches.innerHTML = "";

    if (recentCities.length === 0) {

        recentSearches.style.display =
            "none";

        return;

    }

    recentCities.forEach(city => {

        const item =
            document.createElement("div");

        item.textContent =
            `${city.name}, ${city.country}`;

        item.addEventListener(
            "click",
            () => {

                getWeather(
                    city.latitude,
                    city.longitude,
                    city.name,
                    city.country
                );

                recentSearches.style.display =
                    "none";

            }
        );

        recentSearches.appendChild(item);

    });

}


// ==========================================
// SEARCH SUGGESTIONS
// ==========================================

let searchTimeout;

cityInput.addEventListener(
    "input",
    () => {

        clearTimeout(searchTimeout);

        const query =
            cityInput.value.trim();

        if (query.length < 2) {

            hideSuggestions();

            return;

        }

        searchTimeout =
            setTimeout(
                () => getSuggestions(query),
                400
            );

    }
);


async function getSuggestions(query) {

    try {

        const response =
            await fetch(
                `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
            );

        const data =
            await response.json();

        searchSuggestions.innerHTML = "";

        if (!data.results) return;

        data.results.forEach(location => {

            const item =
                document.createElement("div");

            item.textContent =
                `${location.name}, ${location.country}`;

            item.addEventListener(
                "click",
                () => {

                    cityInput.value =
                        location.name;

                    getWeather(
                        location.latitude,
                        location.longitude,
                        location.name,
                        location.country
                    );

                    saveRecentCity({
                        name: location.name,
                        country: location.country,
                        latitude: location.latitude,
                        longitude: location.longitude
                    });

                    hideSuggestions();

                }
            );

            searchSuggestions.appendChild(item);

        });

    } catch (error) {

        console.error(error);

    }

}


function hideSuggestions() {

    searchSuggestions.innerHTML = "";

}


// ==========================================
// CLOCK
// ==========================================

function updateClock() {

    if (!currentWeatherData) return;

    const timezone =
        currentWeatherData.timezone;

    const now =
        new Date();

    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: timezone,
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

    const timeFormatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    localDate.textContent =
        formatter.format(now);

    localTime.textContent =
        timeFormatter.format(now);

}


// ==========================================
// UNIT CONVERSION
// ==========================================

function toggleUnit() {

    currentUnit =
        currentUnit === "C"
            ? "F"
            : "C";

    const activeUnit =
        document.querySelector(
            ".unit-toggle .active"
        );

    if (activeUnit) {

        activeUnit.classList.remove(
            "active"
        );

    }

    if (currentUnit === "C") {

        document.querySelector(
            ".unit-c"
        ).classList.add("active");

    } else {

        document.querySelector(
            ".unit-f"
        ).classList.add("active");

    }

    if (currentLocation) {

        getWeather(
            currentLocation.latitude,
            currentLocation.longitude,
            currentLocation.name,
            currentLocation.country
        );

    }

}


// ==========================================
// THEME
// ==========================================

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "atmosTheme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        themeBtn.textContent = "☀️";

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );

    const isLight =
        document.body.classList.contains(
            "light-theme"
        );

    localStorage.setItem(
        "atmosTheme",
        isLight ? "light" : "dark"
    );

    themeBtn.textContent =
        isLight ? "☀️" : "☾";

}


// ==========================================
// SAVE LAST LOCATION
// ==========================================

function saveLastCity() {

    if (!currentLocation) return;

    localStorage.setItem(
        "atmosLastCity",
        JSON.stringify(currentLocation)
    );

}


// ==========================================
// LOADING / ERROR
// ==========================================

function showLoading() {

    loadingScreen.style.display =
        "flex";

    errorMessage.style.display =
        "none";

}


function hideLoading() {

    loadingScreen.style.display =
        "none";

}


function showError(message) {

    hideLoading();

    errorText.textContent =
        message;

    errorMessage.style.display =
        "block";

}


// ==========================================
// FORMAT HELPERS
// ==========================================

function formatTime(timeString) {

    const date =
        new Date(timeString);

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


function formatDate(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        [],
        {
            month: "short",
            day: "numeric"
        }
    );

}


// ==========================================
// EVENT LISTENERS
// ==========================================

searchBtn.addEventListener(
    "click",
    searchCity
);

cityInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchCity();

        }

    }
);

locationBtn.addEventListener(
    "click",
    getUserLocation
);

themeBtn.addEventListener(
    "click",
    toggleTheme
);

unitToggle.addEventListener(
    "click",
    toggleUnit
);

retryBtn.addEventListener(
    "click",
    () => {

        errorMessage.style.display =
            "none";

        loadDefaultWeather();

    }
);


document.getElementById(
    "addLocationBtn"
).addEventListener(
    "click",
    addFavoriteCity
);


document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(".search-box") &&
            !event.target.closest(".search-suggestions")
        ) {

            hideSuggestions();

        }

    }
);


window.addEventListener(
    "resize",
    () => {

        if (currentWeatherData) {

            const currentHour =
                new Date().getHours();

            const times =
                currentWeatherData.hourly.time;

            let index =
                times.findIndex(time =>
                    new Date(time).getHours() >= currentHour
                );

            if (index < 0) index = 0;

            drawTemperatureChart(
                currentWeatherData,
                index
            );

        }

    }
);