const discoCard = document.querySelector("#disco-kpop");
const cardModal = document.querySelector("#modal-container");
const discoURL = "./data/discography.json";
let discos = [];

async function getDiscosKpop() {
    try {
        const response = await fetch(discoURL);
        const data = await response.json();
        discos = data.discos;
        DisplayDiscosKpop(discos);
    } catch (error) {
        console.log(error);
    }
}

function DisplayDiscosKpop(discos) {
    if (!discoCard) return;
    discoCard.innerHTML = "";
    cardModal.innerHTML = "";

    discos.forEach(disco => {
        const dcCard = document.createElement("div");
        dcCard.classList.add("disco-card");

        dcCard.innerHTML = `
            <img src="${disco.image}" alt="${disco.title}" loading="lazy" width="200">
            <h3>${disco.title}</h3>
            <button data-modal="${disco.title.replace(/\s/g,'-')}">View Details</button>
        `;
        discoCard.appendChild(dcCard);

        // Modal
        const dialog = document.createElement("dialog");
        dialog.id = disco.title.replace(/\s/g,'-'); // we change the spaces or other symbols for -
        dialog.innerHTML = `
            <div class="modal-header">
                <h3>${disco.title}</h3>
                <button class="close-btn">❌</button>
            </div>
            <img src="${disco.image}" alt="${disco.title}" width="300">
            <p><strong>Artist:</strong> ${disco.artist}</p>
            <p><strong>Year:</strong> ${disco.year}</p>
            <h4>Songs:</h4>
            <ul>
                ${disco.songs.map(song => `<li>${song}</li>`).join("")} 
            </ul>
        `; // we go through each song and put them in a list with li -- this its do it with .map()
        cardModal.appendChild(dialog);
    });
}

// open and close modals
document.addEventListener("click", e => {
    if(e.target.matches("[data-modal]")) {
        const modalID = e.target.getAttribute("data-modal");
        const modal = document.getElementById(modalID);
        modal.showModal();
    }

    if(e.target.matches(".close-btn")){
        const modal = e.target.closest("dialog");
        modal.close();
    }
});


getDiscosKpop();