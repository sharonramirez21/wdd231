const concertCard = document.querySelector("#concerts-container");

// details we need for the url --- TICKETMASTER API
const myAPI = "NxwtrsBmN1AFSqvYSWQybUBCR4b0e3dG";
const keyword = "Kpop";
const size = 20;

const urlTicket = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&size=${size}&apikey=${myAPI}`;

async function getKpopConcerts() {
    try {
        const response = await fetch(urlTicket);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayConcerts(data);
        }
        else {
            throw new Error(await  response.text());
        }
    } catch (error){
        console.log(error);
    }
}

// random concerts from the array:
function getRandomItems(array, n) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}


// function to display de concert in html
function displayConcerts(data) {
    if (!concertCard) return;
    concertCard.innerHTML = "";

    const events = data._embedded.events;
    const randomConcerts = getRandomItems(events, 4); // get 4 randoms

    randomConcerts.forEach(event => {
        const name = event.name;

        // convert time for api to  dd/mm/yyyy
        const date = new Date(event.dates.start.dateTime).toLocaleDateString();

        // save the name of the place
        const venue = event._embedded.venues[0].name;

        const url = event.url;

        // look for a img if there are no one so we use preholder img
        const image = event.images.filter(img => img.ratio === "16_9" && img.width >= 640)[0]?.url || 'img/placeholder.jpg';

        const card = document.createElement("div");
        card.classList.add("concert-card");

        card.innerHTML = `
            <div class="concert-img">
                <img src="${image}" alt="${name}" loading="lazy">
            </div>
            <div class="concert-details">
                <h3>${name}</h3>
                <p>${venue} - ${date}</p>
                <a href="${url}" target="_blank" class="btn-concert">Buy Ticket</a>
            </div>
        `;

        concertCard.appendChild(card);
    });
}


getKpopConcerts();