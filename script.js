document.getElementById('videoInput').addEventListener('change', loadVideo);
document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('exportButton').addEventListener('click', exportVideo);

let videoURL;
let imageURL;

function loadVideo(event) {
    const file = event.target.files[0];
    if (file) {
        videoURL = URL.createObjectURL(file);
        document.getElementById('videoPlayer').src = videoURL;
    }
}

function loadImage(event) {
    const file = event.target.files[0];
    if (file) {
        imageURL = URL.createObjectURL(file);
    }
}

async function exportVideo() {
    if (!videoURL) {
        alert('Please upload a video first.');
        return;
    }

    const ffmpeg = FFmpeg.createFFmpeg({ log: true });
    await ffmpeg.load();

    // Write input video and image to the FFmpeg filesystem
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoURL));
    if (imageURL) {
        ffmpeg.FS('writeFile', 'overlay.png', await fetchFile(imageURL));
    }

    // Create command to process the video
    const command = imageURL 
        ? '-i input.mp4 -i overlay.png -filter_complex "overlay=10:10" output.mp4'
        : '-i input.mp4 output.mp4';

    await ffmpeg.run(...command.split(' '));

    // Read the output file
    const outputData = ffmpeg.FS('readFile', 'output.mp4');

    // Create a blob and trigger download
    const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
    const downloadURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadURL;
    downloadLink.download = 'edited_video.mp4';
    downloadLink.click();
}

async function fetchFile(url) {
    const response = await fetch(url);
    return await response.arrayBuffer();
}
