const navButton = document.querySelector('#ham-btn');

/*select the nav element*/
const navBar = document.querySelector('#nav-id');

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

    if (!spotlight) return;
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

// EVENTS
function loadEvent() {
    const events = [
        {
            title: "Spring Day Celebration",
            date: "September 21, 2025",
            location: "City Park",
            description: "Celebrate the arrival of spring with music, food stands, and outdoor activities for all ages.",
        }
    ]

    const eventContainer = document.querySelector("#event-container");
    if (!eventContainer) return;
    eventContainer.innerHTML = "";
    events.forEach(e => {
        const article = document.createElement("article");
        article.classList.add("event-card");
        article.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = `${e.title}`;
        title.classList.add("title-e");

        const date = document.createElement("p");
        date.textContent = `${e.date}`;
        date.classList.add("date-event");

        const location = document.createElement("p");
        location.textContent = `Location: ${e.location}`;

        const description = document.createElement("p");
        description.textContent = `${e.description}`;

        article.appendChild(title);
        article.appendChild(date);
        article.appendChild(location);
        article.appendChild(description);

        eventContainer.appendChild(article);
    });
}

loadEvent();
