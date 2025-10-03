const discoverCard = document.querySelector("#discover");

const places = `./data/discover.json`;

async function GetPlacesData(file) {
    try {
        const response = await fetch(file);
        const data = await response.json();
        displayPlaces(data.places);
    }
    catch (error) {
        console.error("Error to loaded", error);
    }
}

const displayPlaces = (places) => {
    if (!discoverCard) return;
    discoverCard.innerHTML = "";

    places.forEach(place => {
        const placeHTML  =`
            <div class="place">
                <h2>${place.name}</h2>
                <img src="${place.photo_url}" alt="${place.name}" width="300" height="200" loading="lazy">
                <p>${place.description}</p>
                <address>${place.address}</address>
                <button class="learn-more">Learn More</button>
            
            </div>
        `;

        discoverCard.innerHTML += placeHTML;
    })
}

GetPlacesData(places);