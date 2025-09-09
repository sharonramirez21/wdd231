const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector("#cards");

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); //
    displayProphets(data.prophets);
}

getProphetData(url);

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement("section");

        const fullName = document.createElement("h2");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        const portrait = document.createElement("img");
        portrait.setAttribute(`src`, prophet.imageurl);
        portrait.setAttribute(`alt`, `Photo ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute(`loading`, `lazy`);
        portrait.setAttribute(`width`, `340`);
        portrait.setAttribute(`height`, `440`);


        const birthDate = document.createElement("p");
        birthDate.textContent = `Birthday: ${prophet.birthdate}`;
        
        const birthPlace = document.createElement("p");
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`
        
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}