
    let song = document.getElementById('song');
    let progress = document.getElementById('progress');
    let ctrlIcon = document.getElementById('ctrlIcon');
    let currentTimeEl = document.getElementById('currentTime');
    let durationEl = document.getElementById('duration');
    let songTitle = document.querySelector('.music-player h1');
    let artist = document.querySelector('.music-player p');
    let songImage = document.querySelector('.song-img');

    // Array of songs
    const songs = [
        {
            name: "Laal Chunariya",
            artist: "Akull",
            src: "Laal Chunariya - Akull 128 Kbps.mp3",
            img: "Laal_chunariya.png"
        },
        {
            name: "Ram Ram",
            artist: "Mc square",
            src: "Ram ram (Hindi) - MC Square 128 Kbps.mp3",
            img: "RamRam.png"
        },
        {
            name: "Jaadugar",
            artist: "Paradox",
            src: "Jaadugar Hustle 2.0 128 Kbps.mp3",
            img: "jaadugar.png"
        }
    ];

    let currentSongIndex = 0;

    // Load a song
    function loadSong(index) {
        let s = songs[index];
        song.src = s.src;
        songTitle.textContent = s.name;
        artist.textContent = `Singer - "${s.artist}"`;
        songImage.src = s.img;
        song.load();
        song.onloadedmetadata = () => {
            progress.max = song.duration;
            durationEl.textContent = formatTime(song.duration);
        };
    }

    // Play / Pause toggle
    function playPause(){
        if(song.paused){
            song.play();
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
        } else {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
        }
    }

    // Next song
    function nextSong(){
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }

    // Previous song
    function prevSong(){
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }

    // Progress bar update
    song.ontimeupdate = function(){
        progress.value = song.currentTime;
        currentTimeEl.textContent = formatTime(song.currentTime);
    };

    progress.onchange = function(){
        song.currentTime = progress.value;
    };

    function formatTime(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = Math.floor(sec % 60);
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        return `${minutes}:${seconds}`;
    }

    // Initial load
    loadSong(currentSongIndex);


    // Auto-play next song when current one ends
    song.onended = function() {
        nextSong();
    };
    song.onerror = function() {
        console.error("Error loading audio file:", song.src);
    };
    song.onstalled = function() {
        console.error("Audio file loading is stalled:", song.src);
    };    