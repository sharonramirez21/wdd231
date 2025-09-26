document.addEventListener("DOMContentLoaded", () => {

    const ts = document.getElementById("timestamp");
    if (ts) {
        const today = new Date();

        const day = String(today.getDate()).padStart(2,'0');
        const month = String(today.getMonth() + 1).padStart(2,'0');
        const year = today.getFullYear();

        // value  to hidden
        ts.value = `${day}/${month}/${year}`;

        console.log("Timestamp agregado:", ts.value);
    }

    // --- thankyou.html --- 
    const thanks = document.getElementById("thank");
    if (thanks) {
        const myInfo = new URLSearchParams(window.location.search);
        thanks.innerHTML = `
            <h2>Your Information</h2>
            <p><strong>Your Name:</strong> ${myInfo.get("firstName")} ${myInfo.get("lastName")}</p>
            <p><strong>Your Email:</strong> ${myInfo.get("email")}</p>
            <p><strong>Your Mobil Number:</strong> ${myInfo.get("phone")}</p>
            <p><strong>Organization Name:</strong> ${myInfo.get("orgName")}</p>
            <p><strong>Your Membership:</strong> ${myInfo.get("Membership")}</p>
            <p><strong>Organization Description:</strong> ${myInfo.get("orgDesc")}</p>
            <p><strong>Time:</strong> ${myInfo.get("timestamp")}</p>
        `;
    }


    function createConfetti() {
        const container = document.getElementById("confetti-container");
        const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#577590", "#43aa8b"]; // conmfetti colors

        for (let i = 0; i < 50; i++) { // 50 confetties 
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");

            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // color ranmdom
            confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
            confetti.style.width = confetti.style.height = Math.random() * 8 + 2 + "px";

            container.appendChild(confetti);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        createConfetti();
    });


    createConfetti();
});
