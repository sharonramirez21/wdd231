const visitSNS = document.querySelector("#sns-visit");

const lastVisited = localStorage.getItem("lastVisit"); // Have I ever come?
const now = Date.now(); // date in miliseconds

let message = "";

if (!lastVisited) {
    message = "Welcome! Let us know if you have any questions."; //  first visit? = WELCOME!
} else {
    const timeDif = now - parseInt(lastVisited);
    const dayDife = Math.floor(timeDif / (1000 * 60 * 60 * 24));

    if (dayDife < 1) { 
        message = "Back so soon! Awesome!"; // same day in other time? Back soon!
    } else if (dayDife === 1) { // 1 day later = 1 day ago
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${dayDife} days ago.`; // more than 1 day= ${dayDife}
    }
}

visitSNS.textContent = message; // write a mesage in the div id const visitSNS
localStorage.setItem("lastVisit", now); // save current date of entry to the page :)
