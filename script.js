const videoPlayer = document.getElementById('videoPlayer');
const videoInput = document.getElementById('videoInput');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');

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
