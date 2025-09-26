// modals & cards from Membership
function DisplayModals() {
    const membershipLevel = [
        {
            title : "Non Profit Membership Level 🌱",
            id: "non-profit-modal",
            price : "$0/month",
            benefits : [
                "Page View.",
                "Newsletter by email."
            ]
        },
        {
            title : "Bronze Membership Level 🥉",
            id: "bronce-modal",
            price : "$20/month",
            benefits : [
                "Access to basic events.",
                "Advance announcements."
            ]
        },
        {
            title : "Silver Membership Level 🥈",
            id: "silver-modal",
            price : "$40/month",
            benefits : [
                "Training sessions.",
                "Web advertising.",
                "Tickets to group events."
            ]
        },
        {
            title : "Gold Membership Level 👑",
            id: "gold-modal",
            price : "$80/month",
            benefits : [
                "Includes Gold benefits.",
                "Exclusive events.",
                "Personal training.",
                "Premium advertising.",
                "VIP discounts."
            ]
        }
    ]

    const cardLevelM = document.querySelector("#level-titles");
    const cardModal = document.querySelector("#modal-container");

    membershipLevel.forEach(level => {
        if (!cardLevelM) return;
        const card = document.createElement("div");
        card.classList.add("levels");
        card.innerHTML = `
            <h3>${level.title}</h3>
            <button data-modal="${level.id}">Learn More</button>
        `;
        cardLevelM.appendChild(card);

        // MODAL CREATE
        const dialog = document.createElement("dialog");
        dialog.id = level.id;
        dialog.innerHTML = `
            <div class="modal-header">
                <h3>${level.title}</h3>
                <button class="close-btn">❌</button>
            </div>
            <p>Price: ${level.price}</p>
            <p>Benefits:</p>
            <ul>
                ${level.benefits.map(b => `<li>${b}</li>`).join("")}
            </ul>
        `;
        cardModal.appendChild(dialog);
    })
}

// open and close modals
document.addEventListener("click", e => {
    if(e.target.matches("[data-modal]")) {
        const modalID = e.target.getAttribute("data-modal");
        document.getElementById(modalID).showModal();
        modal.showModal();
        modal.classList.add("opened");
    }

    if(e.target.matches(".close-btn")){
        e.target.closest("dialog").close();
        modal.close();
        modal.classList.add("closed");
    }
});

DisplayModals();