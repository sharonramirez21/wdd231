document.addEventListener("DOMContentLoaded", () => {

    const ts = document.getElementById("timestamp");
    if (ts) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth()).padStart(2, '0');
        const year = today.getFullYear();

        // value to hidden
        ts.value = `${day}/${month}/${year}`;
        console.log("Timestamp:", ts.value);
    }

    // message.html ==== info
    const message = document.getElementById("sms-info");
    if (message) {
        const messageInfo = new URLSearchParams(window.location.search);
        message.innerHTML = `
        <h2 class=sms-title>Your Message</h2>
        <p class="sms"><strong>Your name:</strong> ${messageInfo.get("name")}</p>
        <p class="sms"><strong>Your Email:</strong> ${messageInfo.get("email")}</p>
        <p class="sms"><strong>Your phone:</strong> ${messageInfo.get("phone")}</p>
        <p class="sms"><strong>Your type of message:</strong> ${messageInfo.get("TypeSMS")}</p>
        <p class="sms"><strong>Your message:</strong> ${messageInfo.get("message")}</p>
        `;
    }
})