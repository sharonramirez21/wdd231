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


// FETCH PART POINT Nº 3 OF JAVA
const url = `./data/members.json`;
const card = document.querySelector("#cards");

async function getMembersData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

getMembersData(url);

const displayMembers = (members) => {
    card.innerHTML = "";
    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        
        // name 
        const name = document.createElement("h3");
        name.textContent = `${member.name}`;

        // photo 
        const photo = document.createElement("img");
        photo.setAttribute(`src`, member.photo);
        photo.setAttribute(`alt`, `Photo ${member.name}`);
        photo.setAttribute(`loading`, `lazy`);
        photo.setAttribute(`width`, `340`);
        photo.setAttribute(`height`, `440`);

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
        
        // cathegory
        const cathegory = document.createElement("p");
        cathegory.textContent = `Cathegory: ${member.cathegory}`;

        memberCard.appendChild(name);
        memberCard.appendChild(photo);
        memberCard.appendChild(address);
        memberCard.appendChild(phone);
        memberCard.appendChild(web);
        memberCard.appendChild(cathegory);


        card.appendChild(memberCard);
    });
}

/* ************toggles ----***************/
btngrid.addEventListener('click', () => {
    card.classList.add('grid');
    card.classList.remove('list');
    btnlist.disabled = false;
})

btnlist.addEventListener('click', () => {
    card.classList.add('list');
    card.classList.remove('grid');
    btngrid.disabled = false;
})