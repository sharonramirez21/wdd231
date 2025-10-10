
// current date
const today = new Date();

// current year --- with getFullYear()
const currentYear = today.getFullYear();
document.getElementById("currentyear").textContent = currentYear;  // insert ot html

// lastModified
const LastModifiedDate = document.lastModified; // lasModified get the last docuemnt modification
document.getElementById("lastModified").textContent = `Last Modification: ${LastModifiedDate}`; // insert to html