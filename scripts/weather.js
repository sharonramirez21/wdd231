const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");


// CREATE VARIABLES FOR THE URL 
const myKey = "c446a7e54be888e41c736b3c95b6c97e";
const myLat = "49.767565128445504";
const myLong = "6.6384580001375";

// create url
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;


async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw new Error(await  response.text());
        }
    } catch (error){
        console.log(error);
    }
}

// display json data
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute(`src`, iconsrc);
    weatherIcon.setAttribute(`alt`, desc);

    captionDesc.textContent = `${desc}`;
}

apiFetch();
