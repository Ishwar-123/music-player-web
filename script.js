// Current song index to track the song being played
let currentSongIndex = 0;

// Arrays to hold song titles, artists, album covers, and song files
const songTitles = [
    '2 PHUT HON FUNK',
    'DJ FKU - MTG - PEGA LA',
    'DYGO & Mxng0 - FUNK INFERNAL',
    'Eu Sento Gabu!',
    'FUNK DO BALKAN (Slowed Reverb)',
    'Irokz - FUNK UNIVERSO',
    'Ogryzek - AURA',
    'Ogryzek - EMPIRE (Slowed)',
    'RedRubix x SXID - Frente Frente (Super Slowed)'
];
const artists = [
    'Mgd and KhangMxne',
    'valentin Valkianinen',
    'DYGO & MxngO',
    'Eu Sento Gabu',
    'CHXRNVKHA',
    'Irokz',
    'Artist Unknown',
    'Artist Unknown',
    'Artist Unknown'
];
const albumCovers = [
    'img/2-phut-hon-funk.png',
    'img/fku.png',
    'img/funk infernal.png',
    'img/eu sento gabu.png',
    'img/fink do balkan.png',
    'img/funk universo.png',
    'img/aura.png',
    'img/empire.png',
    'img/french.png'
];
const songFiles = [
    'audio/2 PHÚT HƠN FUNK.mp3',
    'audio/DJ FKU - MTG - PEGA LA.mp3',
    'audio/DYGO & Mxng0 - FUNK INFERNAL [Brazilian Phonk].mp3',
    'audio/Eu Sento Gabu!.mp3',
    'audio/FUNK DO BALKAN (Slowed  Reverb) [BRAZILIAN PHONK].mp3',
    'audio/Irokz - FUNK UNIVERSO.mp3',
    'audio/Ogryzek - AURA.mp3',
    'audio/Ogryzek - EMPIRE (Slowed).mp3',
    'audio/RedRubix x SXID - Frente Frente (Super Slowed).mp3'
];

// Initialize playing state and get audio player and progress bar elements
let playing = false;
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress');
const stopButton = document.querySelector('.stop-button');

// Helper function to format time (minutes:seconds)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

// Function to play a song based on its index
function playSong(index) {
    // Reset background colors of all song items
    document.querySelectorAll('.song-item').forEach(item => {
        item.style.backgroundColor = '#282828';
    });

    // Set background color of the currently selected song item
    document.querySelectorAll('.song-item')[index].style.backgroundColor = '#13bee0';

    // Update the current song index and display relevant song details
    currentSongIndex = index;
    document.getElementById('song-name').innerText = songTitles[currentSongIndex];
    document.getElementById('artist-name').innerText = artists[currentSongIndex];
    document.getElementById('album-cover').src = albumCovers[currentSongIndex];
    audioPlayer.src = songFiles[currentSongIndex];

    // Reset scroll animation and reapply it after a short delay
    document.getElementById('song-name').style.animation = 'none';
    document.getElementById('artist-name').style.animation = 'none';
    setTimeout(() => {
        document.getElementById('song-name').style.animation = 'scrollText 5s linear infinite';
        document.getElementById('artist-name').style.animation = 'scrollText 5s linear infinite';
    }, 100);

    // Play the song
    audioPlayer.play();
    playing = true;

    // Change play button to pause symbol
    document.querySelector('.play-button').innerHTML = '&#10074;&#10074;';

    // Show the player and update it
    showPlayer();
    updatePlayer();

    // Hide stop button
    stopButton.style.display = 'none';
}

// Toggle play and pause functionality
function togglePlayPause() {
    if (playing) {
        audioPlayer.pause();
        playing = false;
        document.querySelector('.play-button').innerHTML = '&#9654;';
    } else {
        audioPlayer.play();
        playing = true;
        document.querySelector('.play-button').innerHTML = '&#10074;&#10074;';
    }
}

// Show the player when a song is selected
function showPlayer() {
    document.querySelector('.player').style.display = 'flex';
}

// Close the player and reset to initial state
function closePlayer() {
    playing = false;
    document.querySelector('.player').style.display = 'none';
    document.querySelector('.play-button').innerHTML = '&#9654;';
    stopButton.style.display = 'block';
}

// Update the player progress and track song completion
function updatePlayer() {
    const interval = setInterval(() => {
        // If the song has finished, play the next song
        if (audioPlayer.currentTime >= audioPlayer.duration) {
            nextSong();
            clearInterval(interval);
        }

        // Update the progress bar and time display
        progressBar.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + '%';
        document.getElementById('current-time').innerText = formatTime(audioPlayer.currentTime);
        document.getElementById('total-time').innerText = formatTime(audioPlayer.duration);
    }, 0);
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songTitles.length) % songTitles.length;
    playSong(currentSongIndex);
}

// Play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songTitles.length;
    playSong(currentSongIndex);
}

// Function to seek to a specific part of the song by clicking on the progress bar
function seekSong(event) {
    const progressBar = document.querySelector(".progress-bar");
    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Variable to track whether the user is seeking on the progress bar
let isSeeking = false;

// Update song progress while seeking with mouse movement
document.addEventListener("mousemove", (event) => {
    if (isSeeking) {
        seekSong(event);
    }
});

// Stop the music and reset everything
function stopMusic() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playing = false;
    document.querySelector('.play-button').innerHTML = '&#9654;';
    document.querySelector('.player').style.display = 'none';
    stopButton.style.display = 'none';

    // Reset all song items' background color to normal
    document.querySelectorAll('.song-item').forEach(item => {
        item.style.backgroundColor = '#282828';
    });
}

// Function for searching songs by title
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("song-list");
    const item = document.querySelectorAll(".song-item");
    const pname = storeitems.getElementsByTagName("h5");

    for (let i = 0; i < pname.length; i++) {
        let match = item[i].getElementsByTagName('h5')[0];
        if (match) {
            let textvalue = match.textContent || match.innerHTML;
            if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                item[i].style.display = "flex";
            } else {
                item[i].style.display = "none";
            }
        }
    }
}