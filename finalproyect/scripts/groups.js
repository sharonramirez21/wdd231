const createGroup = document.querySelector("#group-container");
const groupUrl = './data/groups.json';
let groups = [];

async function getGroupsInfo() {
    try {
        const response = await fetch(groupUrl);
        const data = await response.json();
        groups = data.groups;
        DisplayGroups(groups);
        scrollToHash();
    } catch (error) {
        console.log(error);
    }
}

function DisplayGroups(groups) {
    createGroup.innerHTML = "";

    groups.forEach(group => {
        const card = document.createElement("div");
        card.classList.add("group-card");
        card.id = group.id; // for links
        
        card.innerHTML = `
        <div class="group-header">
            <h3>${group.name}</h3>
        </div>
        <img src="${group.image}" alt="${group.name} photo" loading="lazy">
        <p><strong>Members:</strong> ${group.members.join(", ")}</p>
        <p><strong>Debut:</strong> ${group.debut}</p>
        <p><strong>History:</strong> ${group.summary}</p>
        `;

        // fav btn
        const favBtn = document.createElement("button");
        favBtn.textContent = "❤";

        // if is fav so coloring
        const colorFav = JSON.parse(localStorage.getItem("colorFav")) || [];
        if (colorFav.includes(group.id)) favBtn.style.color = "red";

        // event to fav
        favBtn.addEventListener("click", () => {
            TogglecolorFav(group.id, favBtn);
        })
        card.querySelector(".group-header").appendChild(favBtn); // h3 and btn
        createGroup.appendChild(card);
    })
}

// fuction for fav btn 
function TogglecolorFav(id, btn) {
    let colorFav = JSON.parse(localStorage.getItem("colorFav")) || [];

    if (colorFav.includes(id)) {
        colorFav = colorFav.filter(favId => favId !== id);
        btn.style.color = "black";
    }
    else {
        colorFav.push(id);
        btn.style.color = "red";
    }

    localStorage.setItem("colorFav", JSON.stringify(colorFav));
}

// fuction to id ---- index.html to group.html and scroll until the id is equal to de select one. 
function scrollToHash() {
    if (window.location.hash) {
        const id = window.location.hash.substring(1); // quit the #
        const element = document.getElementById(id); // there are a id equal ??
        if (element) element.scrollIntoView({ behavior: "smooth" }); // if yes we need to scroll
    }
}

getGroupsInfo();