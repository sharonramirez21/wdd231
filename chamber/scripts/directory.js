/***/
const card = document.querySelector("#cards-directory");
/*select the botton of grid */
const btngrid = document.querySelector("#grid-btn");
/*select the botton of list */
const btnlist = document.querySelector("#list-btn");

// FETCH PART POINT Nº 3 OF JAVA and spotlights 
const membersUrl = `./data/members.json`;

async function getMembersData(membersUrl) {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayMembers(data.members);   // grid/list
    } catch (error) {
        console.error("Error to loaded", error);
    }
}

const displayMembers = (members) => {
    if (!card) return;
    card.innerHTML = "";

    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        
        const name = document.createElement("h3");
        name.textContent = member.name;

        const photo = document.createElement("img");
        photo.src = member.photo;
        photo.alt = `Photo ${member.name}`;
        photo.loading = "lazy";
        photo.width = 340;
        photo.height = 440;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const web = document.createElement("a");
        web.href = `https://${member.url}`;
        web.target = "_blank";
        web.textContent = member.url;

        const cathegory = document.createElement("p");
        cathegory.textContent = `Cathegory: ${member.cathegory}`;

        memberCard.append(name, photo, address, phone, web, cathegory);
        card.appendChild(memberCard);
    });
};

card.classList.add('grid');

btngrid.addEventListener('click', () => {
    card.classList.add('grid');
    card.classList.remove('list');
});

btnlist.addEventListener('click', () => {
    card.classList.add('list');
    card.classList.remove('grid');
});

getMembersData(url);