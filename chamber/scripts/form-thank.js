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
            <p class="tp"><strong>Your Name:</strong> ${myInfo.get("firstName")} ${myInfo.get("lastName")}</p>
            <p class="tp"><strong>Your Email:</strong> ${myInfo.get("email")}</p>
            <p class="tp"><strong>Your Mobil Number:</strong> ${myInfo.get("phone")}</p>
            <p class="tp"><strong>Organization Name:</strong> ${myInfo.get("orgName")}</p>
            <p class="tp"><strong>Your Membership:</strong> ${myInfo.get("Membership")}</p>
            <p class="tp"><strong>Organization Description:</strong> ${myInfo.get("orgDesc")}</p>
            <p class="tp"><strong>Time:</strong> ${myInfo.get("timestamp")}</p>
        `;
    }
});
