// Node class for Doubly Linked List
class MusicNode {
    constructor(id, title, artist, albumArt, duration, audioSrc) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.albumArt = albumArt;
        this.duration = duration;
        this.audioSrc = audioSrc;
        this.prev = null;
        this.next = null;
    }
}

// Doubly Linked List class for Music Playlist
class MusicPlaylist {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.size = 0;
    }

    // Add music to the end of playlist
    addMusic(id, title, artist, albumArt, duration, audioSrc) {
        const newNode = new MusicNode(id, title, artist, albumArt, duration, audioSrc);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        
        this.size++;
        return newNode;
    }

    // Insert music at a specific position
    insertMusic(position, id, title, artist, albumArt, duration, audioSrc) {
        if (position < 0 || position > this.size) {
            console.log("Invalid position");
            return null;
        }

        const newNode = new MusicNode(id, title, artist, albumArt, duration, audioSrc);

        if (position === 0) {
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
                this.current = newNode;
            } else {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
        } else if (position === this.size) {
            return this.addMusic(id, title, artist, albumArt, duration, audioSrc);
        } else {
            let temp = this.head;
            for (let i = 0; i < position - 1; i++) {
                temp = temp.next;
            }
            newNode.next = temp.next;
            newNode.prev = temp;
            temp.next.prev = newNode;
            temp.next = newNode;
        }

        this.size++;
        return newNode;
    }

    // Search for music by ID
    searchById(id) {
        let temp = this.head;
        while (temp) {
            if (temp.id === id) {
                return temp;
            }
            temp = temp.next;
        }
        return null;
    }

    // Play next music (circular)
    playNext() {
        if (!this.current) return null;
        
        if (this.current.next) {
            this.current = this.current.next;
        } else {
            // If at the end, go to the beginning
            this.current = this.head;
        }
        
        return this.current;
    }

    // Play previous music (circular)
    playPrev() {
        if (!this.current) return null;
        
        if (this.current.prev) {
            this.current = this.current.prev;
        } else {
            // If at the beginning, go to the end
            this.current = this.tail;
        }
        
        return this.current;
    }

    // Get current music
    getCurrentMusic() {
        return this.current;
    }

    // Set current music by ID
    setCurrentById(id) {
        const music = this.searchById(id);
        if (music) {
            this.current = music;
            return music;
        }
        return null;
    }

    // Get all music as array
    getAllMusic() {
        const musicList = [];
        let temp = this.head;
        while (temp) {
            musicList.push(temp);
            temp = temp.next;
        }
        return musicList;
    }

    // Remove music by ID
    removeMusic(id) {
        const music = this.searchById(id);
        if (!music) return false;

        if (music === this.head && music === this.tail) {
            this.head = null;
            this.tail = null;
            this.current = null;
        } else if (music === this.head) {
            this.head = music.next;
            this.head.prev = null;
            if (this.current === music) {
                this.current = this.head;
            }
        } else if (music === this.tail) {
            this.tail = music.prev;
            this.tail.next = null;
            if (this.current === music) {
                this.current = this.tail;
            }
        } else {
            music.prev.next = music.next;
            music.next.prev = music.prev;
            if (this.current === music) {
                this.current = music.next;
            }
        }

        this.size--;
        return true;
    }
}

// Music Player Controller
class MusicPlayerController {
    constructor() {
        this.playlist = new MusicPlaylist();
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        
        this.initializeElements();
        this.initializeSampleMusic();
        this.attachEventListeners();
        this.renderPlaylist();
    }

    initializeElements() {
        // Player controls
        this.playBtn = document.querySelector('.play-pause-btn');
        this.prevBtn = document.querySelectorAll('.music-icons')[1];
        this.nextBtn = document.querySelectorAll('.music-icons')[3];
        this.shuffleBtn = document.querySelectorAll('.music-icons')[0];
        this.repeatBtn = document.querySelectorAll('.music-icons')[4];
        
        // Album info
        this.albumPic = document.querySelector('.album-pic');
        this.songTitle = document.querySelector('.abt-1');
        this.artistName = document.querySelector('.abt-2');
        
        // Playback
        this.playbackBar = document.querySelector('.playback-bar');
        this.currentTimeEl = document.querySelectorAll('.time')[0];
        this.durationEl = document.querySelectorAll('.time')[1];
        
        // Volume
        this.volumeBar = document.querySelector('.volumn-bar');
        
        // Cards container for playlist
        this.recentlyPlayedContainer = document.querySelector('.cards-container');
    }

    initializeSampleMusic() {
        // Playlist starts empty - users will import their own music
        console.log('Playlist initialized - ready to import music from device');
    }

    attachEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous button
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        
        // Next button
        this.nextBtn.addEventListener('click', () => this.playNext());
        
        // Playback bar
        this.playbackBar.addEventListener('input', (e) => this.seekMusic(e.target.value));
        
        // Volume bar
        this.volumeBar.addEventListener('input', (e) => this.changeVolume(e.target.value));
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.onMusicEnded());
    }

    loadMusic(musicNode) {
        if (!musicNode) return;
        
        this.audio.src = musicNode.audioSrc;
        this.albumPic.src = musicNode.albumArt;
        this.songTitle.textContent = musicNode.title;
        this.artistName.textContent = musicNode.artist;
        this.durationEl.textContent = musicNode.duration;
        
        // Update active card
        this.updateActiveCard(musicNode.id);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        // Change to pause icon
        this.playBtn.classList.remove('fa-circle-play');
        this.playBtn.classList.add('fa-circle-pause');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        // Change back to play icon
        this.playBtn.classList.remove('fa-circle-pause');
        this.playBtn.classList.add('fa-circle-play');
    }

    playNext() {
        const nextMusic = this.playlist.playNext();
        this.loadMusic(nextMusic);
        if (this.isPlaying) {
            this.play();
        }
    }

    playPrevious() {
        const prevMusic = this.playlist.playPrev();
        this.loadMusic(prevMusic);
        if (this.isPlaying) {
            this.play();
        }
    }

    onMusicEnded() {
        // Automatically play next song when current ends
        this.playNext();
    }

    seekMusic(value) {
        const seekTime = (value / 100) * this.audio.duration;
        this.audio.currentTime = seekTime;
    }

    changeVolume(value) {
        this.audio.volume = value / 100;
    }

    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.playbackBar.value = progress;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateDuration() {
        if (this.audio.duration) {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    playMusicById(id) {
        const music = this.playlist.setCurrentById(id);
        if (music) {
            this.loadMusic(music);
            this.play();
        }
    }

    updateActiveCard(id) {
        // Remove active class from all cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active-card');
        });
        
        // Add active class to current card
        const activeCard = document.querySelector(`[data-music-id="${id}"]`);
        if (activeCard) {
            activeCard.classList.add('active-card');
        }
    }

    renderPlaylist() {
        const musicList = this.playlist.getAllMusic();
        
        // Clear existing cards
        this.recentlyPlayedContainer.innerHTML = '';
        
        if (musicList.length === 0) {
            // Show empty state message
            this.recentlyPlayedContainer.innerHTML = `
                <div style="color: #888; font-size: 0.9rem; padding: 2rem;">
                    No music in playlist. Click "Add Music" to import songs from your device.
                </div>
            `;
            return;
        }
        
        // Render each music as a card
        musicList.forEach(music => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-music-id', music.id);
            card.innerHTML = `
                <img class="card-img" src="${music.albumArt}" alt="${music.title}">
                <p class="card-title">${music.title}</p>
                <p class="card-info">${music.artist}</p>
            `;
            
            // Add click event to play music
            card.addEventListener('click', () => this.playMusicById(music.id));
            
            this.recentlyPlayedContainer.appendChild(card);
        });
    }

    // Method to add new music dynamically
    addNewMusic(id, title, artist, albumArt, duration, audioSrc) {
        this.playlist.addMusic(id, title, artist, albumArt, duration, audioSrc);
        this.renderPlaylist();
    }

    // Method to insert music at position
    insertMusicAt(position, id, title, artist, albumArt, duration, audioSrc) {
        this.playlist.insertMusic(position, id, title, artist, albumArt, duration, audioSrc);
        this.renderPlaylist();
    }

    // Method to remove music
    removeMusicById(id) {
        this.playlist.removeMusic(id);
        this.renderPlaylist();
    }
}

// Initialize the music player when DOM is loaded
let musicPlayer;

document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayerController();
    
    // Set initial volume
    musicPlayer.audio.volume = 0.5;
    musicPlayer.volumeBar.value = 50;
    
    // Initialize modal functionality
    initializeModal();
    
    console.log('Music Player Initialized!');
    console.log('Use musicPlayer.addNewMusic() to add new songs');
    console.log('Use musicPlayer.insertMusicAt() to insert at specific position');
    console.log('Use musicPlayer.removeMusicById() to remove songs');
});

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('addMusicModal');
    const addMusicBtn = document.getElementById('addMusicBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('addMusicForm');

    // Open modal
    addMusicBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            form.reset();
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('musicTitle').value;
        const artist = document.getElementById('musicArtist').value;
        const audioFile = document.getElementById('musicAudioFile').files[0];
        const albumArtFile = document.getElementById('musicAlbumArt').files[0];
        
        if (!audioFile) {
            alert('Please select an audio file!');
            return;
        }
        
        // Create object URLs for the files
        const audioSrc = URL.createObjectURL(audioFile);
        
        // Use uploaded image or random placeholder from Unsplash
        let albumArt;
        if (albumArtFile) {
            albumArt = URL.createObjectURL(albumArtFile);
        } else {
            // Generate random album art from Unsplash with music/album theme
            const randomId = Math.floor(Math.random() * 1000);
            albumArt = `https://picsum.photos/seed/${randomId}/400/400`;
        }
        
        // Create a temporary audio element to get duration
        const tempAudio = new Audio(audioSrc);
        tempAudio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(tempAudio.duration);
            
            // Generate unique ID based on current playlist size
            const newId = musicPlayer.playlist.size + 1;
            
            // Add music to playlist
            musicPlayer.addNewMusic(newId, title, artist, albumArt, duration, audioSrc);
            
            // Show success message
            alert(`"${title}" by ${artist} has been imported to your playlist!`);
            
            // Close modal and reset form
            modal.style.display = 'none';
            form.reset();
        });
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
