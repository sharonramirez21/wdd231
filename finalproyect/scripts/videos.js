const featuredVideo = document.getElementById('featured-video');
const videosUrl = './data/videos.json';
let videos = [];

async function getVideos() {
    try {
        const response = await fetch(videosUrl);
        const data = await response.json();
        videos = data.items;
        displayVideos();
    } catch (error) {
        console.log("The file its not working",error);
    }
}

function displayVideos() {
    if (!featuredVideo) return;
    featuredVideo.innerHTML = "";

    // for the large page we choose 3 videos and for the small just 1
    const videoCount = window.innerWidth >= 900 ? 3 : 1;

    // random video :) choosed
    // it is renewed every time the page is reloaded
    const selectedVideos = [];
    while (selectedVideos.length < videoCount && selectedVideos.length < videos.length) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        const video = videos[randomIndex];
        if (!selectedVideos.includes(video)) {
            selectedVideos.push(video);
        }
    }

    selectedVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-card');

        videoElement.innerHTML = `
            <a href="${video.url}" target="_blank">
                <img src="${video.thumbnail}" alt="${video.title}" />
                <p>${video.title}</p>
            </a>
        `;
        featuredVideo.appendChild(videoElement);
    });
}


// if the screen change from size
window.addEventListener('resize', () => {
    displayVideos();
});

getVideos();
