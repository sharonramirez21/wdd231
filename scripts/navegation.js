const navButton = document.querySelector('#ham-btn');

/*select the nav element*/
const navBar = document.querySelector('#nav-bar');

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