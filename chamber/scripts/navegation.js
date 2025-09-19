const navButton = document.querySelector('#ham-btn');

/*select the nav element*/
const navBar = document.querySelector('#nav-id');

/*select the botton of grid */
const btngrid = document.querySelector("#grid-btn");
/*select the botton of list */
const btnlist = document.querySelector("#list-btn");

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// current date
const today = new Date();

// current year --- with getFullYear()
const currentYear = today.getFullYear();
document.getElementById("currentyear").textContent = currentYear;  // insert ot html

// lastModified
const LastModifiedDate = document.lastModified; // lasModified get the last docuemnt modification
document.getElementById("lastModified").textContent = `Last Modification: ${LastModifiedDate}`; // insert to html


// FETCH PART POINT Nº 3 OF JAVA and spotlights 
const url = `./data/members.json`;
const spotlight = document.querySelector("#spotlight-cont");

async function getMembersData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displaySpotlight(data.members); // spotlights
}

getMembersData(url);

// DISPLAY SPOTLIGHTS
function displaySpotlight(members) {
    const elegibleMembers = members.filter(member => member.membership >= 2);
    const randomSelect = elegibleMembers.sort(() => 0.5 - Math.random()).slice(0,3);

    console.log("Spotlights seleccionados:", randomSelect);

    spotlight.innerHTML = "";

    randomSelect.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");

        // name 
        const name = document.createElement("h3");
        name.textContent = `${member.name}`;

        // div for the img + alt
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // logo 
        const photo = document.createElement("img");
        photo.setAttribute(`src`, member.photo);
        photo.setAttribute(`alt`, `Photo ${member.name}`);
        photo.setAttribute(`loading`, `lazy`);
        photo.setAttribute(`width`, `340`);
        photo.setAttribute(`height`, `440`);

        // div for the info : address + phone + website + membership
        const info = document.createElement("div");
        info.classList.add("card-info");

        // Address
        const address = document.createElement("p");
        address.textContent = `${member.address}`;
        
        // phone
        const phone = document.createElement("p");
        phone.textContent = `${member.phone}`;

        // url -- website
        const web = document.createElement("a");
        web.setAttribute(`href`, `https://${member.url}`);
        web.setAttribute("target", "_blank");
        web.textContent = member.url;

        // mermbership
        const membershipLevel = document.createElement("p");
        membershipLevel.textContent = member.membership === 2 ? "Silver Membership" : "Gold Membership";

        // add name in the membercard
        memberCard.appendChild(name);

        cardBody.appendChild(photo);

        info.appendChild(address);
        info.appendChild(phone);
        info.appendChild(web);
        info.appendChild(membershipLevel);

        // add info to the cardbody where its the photo
        cardBody.appendChild(info);

        // add div=cardbody to the membercard
        memberCard.appendChild(cardBody);


        spotlight.appendChild(memberCard);

    });
}


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
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    img.setAttribute(`src`, iconsrc);
    img.setAttribute(`alt`, desc);
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