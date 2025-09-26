// API WEATHER PART
const currentWeatherDiv = document.querySelector("#current-weather");
const forecastDiv = document.querySelector("#forecast");

const myKey = "c446a7e54be888e41c736b3c95b6c97e";
const myLat = "-31.610396537347672";
const myLong = "-60.693833353841335";

//url 
const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(urlWeather);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCurrrentWeather(data);
        }
        else {
            throw new Error(await  response.text());
        }
    } catch (error){
        console.log(error);
    }
}

// display json data
function displayCurrrentWeather(data) {
    if (!currentWeatherDiv) return;
    currentWeatherDiv.innerHTML= "";

    // div for the data
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("weather-data"); 


    // temp actual
    const temp = document.createElement('p');
    temp.classList.add("temp-act");
    temp.textContent = `Temp: ${data.main.temp} °C`;

    // icon and desc
    const img = document.createElement("img");
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    img.setAttribute(`src`, iconsrc);
    img.setAttribute(`alt`, desc);
    img.setAttribute("loading", "lazy");
    img.setAttribute(`width`, `100`);
    img.setAttribute(`height`, `100`);
    const descP = document.createElement("p");
    descP.textContent = `${desc}`;

    // hiw and low
    const high = document.createElement("p");
    high.textContent = `High: ${data.main.temp_max} °C`;

    const low = document.createElement("p");
    low.textContent = `Low: ${data.main.temp_min} °C`;

    // humedety
    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // sunrise
    const sunrise = document.createElement("p");

    const convSunrise = data.sys.sunrise; // sunrise to  hour
    let sunriseDate = new Date(convSunrise * 1000); // 1000s
    let sunriseHour = sunriseDate.getHours();
    const sunriseMin = sunriseDate.getMinutes();
    const sunriseAMPM = sunriseHour >= 12 ? "PM" : "AM";
    sunriseHour = sunriseHour % 12 || 12; 

    sunrise.textContent= `Sunrise: ${sunriseHour}:${sunriseMin.toString().padStart(2,'0')}  ${sunriseAMPM}`;

    // sunsett
    const sunset = document.createElement("p");

    const convSunset = data.sys.sunset;
    let sunsetDate = new Date(convSunset * 1000);
    let sunsetHour = sunsetDate.getHours();
    const sunsetMin = sunsetDate.getMinutes();
    const sunsetAMPM = sunsetHour >= 12 ? "PM" : "AM";
    sunsetHour = sunsetHour % 12 || 12;

    sunset.textContent = `Sunset: ${sunsetHour}:${sunsetMin.toString().padStart(2,'0')} ${sunsetAMPM}`;

    dataDiv.appendChild(temp);
    dataDiv.appendChild(humidity);
    dataDiv.appendChild(high);
    dataDiv.appendChild(low);
    dataDiv.appendChild(sunrise);
    dataDiv.appendChild(sunset);

    currentWeatherDiv.appendChild(img);
    currentWeatherDiv.appendChild(dataDiv);


}

//forecast 
async function getForecast() {
    try {
        const response = await fetch(urlForecast);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecastWeather(data);
        }
        else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.log(error);
    }
};

function displayForecastWeather(data) {
    if (!forecastDiv) return;
    forecastDiv.innerHTML = "";
    // 3 days
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,3);

    dailyData.forEach(day =>  { 
        const date = new Date(day.dt * 1000);
        const dayName = date.toDateString().split(' ')[0];;
        const temp =  day.main.temp;

        const p = document.createElement("p");
        p.innerHTML = `${dayName} : <strong>${temp} ℃ </strong>`;

        forecastDiv.appendChild(p);
    });
};

getWeather();
getForecast();