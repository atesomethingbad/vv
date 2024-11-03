const videoPlayer = document.getElementById('videoPlayer');
const videoInput = document.getElementById('videoInput');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const videoContainer = document.getElementById('videoContainer');

// Load video file from input
videoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        videoPlayer.src = videoURL;
    }
});

// Play video
playButton.addEventListener('click', () => {
    videoPlayer.play();
});

// Pause video
pauseButton.addEventListener('click', () => {
    videoPlayer.pause();
});

// Stop video
stopButton.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0; // Reset to the beginning
});

// Fullscreen toggle
fullscreenButton.addEventListener('click', () => {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) { // Firefox
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) { // IE/Edge
        videoContainer.msRequestFullscreen();
    }
});
