# TuneX - Smart Music Player

TuneX is a fully functional music player web application built with a **Doubly Linked List** data structure for efficient playlist management. It features a Spotify-inspired UI with the ability to import and play music directly from your device.

## Technologies Used

- **HTML**: Structure and layout of the web application
- **CSS**: Styling and responsive design
- **JavaScript (ES6+)**: Core functionality and music player logic
- **Data Structures**: Doubly Linked List implementation for playlist management

## Key Features

### Music Management
- **Import Music from Device**: Upload audio files (MP3, WAV, OGG, M4A) directly from your computer
- **Custom Album Art**: Upload custom images or use auto-generated random album covers
- **Doubly Linked List Playlist**: Efficient bidirectional traversal and circular playback

### Player Controls
- **Play/Pause Toggle**: Dynamic icon switching with Font Awesome icons
- **Next/Previous**: Navigate through your playlist with circular looping
- **Seek Bar**: Scrub through songs with real-time progress tracking
- **Volume Control**: Adjustable volume slider
- **Auto-play**: Automatically plays the next song when current one ends

### User Interface
- **Spotify-inspired Design**: Clean, modern dark theme
- **Interactive Cards**: Click any song card to play that track instantly
- **Active Track Highlighting**: Currently playing song is highlighted in green
- **Modal Form**: Beautiful popup form for importing music
- **Responsive Layout**: Adapts to different screen sizes
- **Empty State**: Helpful message when playlist is empty

### Data Structure Features
- **Add Music**: Append songs to the end of the playlist
- **Insert Music**: Insert songs at specific positions
- **Search by ID**: Efficient search and retrieval of tracks
- **Remove Music**: Delete songs from the playlist
- **Circular Navigation**: Seamlessly loops from last to first song

## Font and Icons

- **Fonts**: Google Fonts - Montserrat family for clean typography
- **Icons**: FontAwesome 6.4.0 for navigation and player controls
- **Album Placeholders**: Lorem Picsum API for random album art generation

## Project Structure

```
Spotify-Clone-Project/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Music player logic and doubly linked list implementation
├── assets/             # Images and icons
└── Homework Assets/    # Additional assets
```

## How It Works

### Doubly Linked List Implementation
Each song in the playlist is a node in a doubly linked list with:
- `prev`: Pointer to previous song
- `next`: Pointer to next song
- `id`: Unique identifier for the track
- Song metadata (title, artist, duration, album art, audio source)

### Circular Playback
When reaching the end of the playlist, the next button loops back to the first song, and vice versa for the previous button.

## Usage

1. **Open the Application**: Launch `index.html` in a web browser
2. **Import Music**: Click "Add Music" button in the sidebar
3. **Select Audio File**: Choose an audio file from your device
4. **Fill Details**: Enter song title and artist name
5. **Optional Album Art**: Upload a custom image or let the system generate one
6. **Play Music**: Click on any song card to start playing
7. **Control Playback**: Use player controls at the bottom

## Console API

For advanced users, the following methods are available in the browser console:

```javascript
// Add new music
musicPlayer.addNewMusic(id, title, artist, albumArt, duration, audioSrc)

// Insert music at specific position
musicPlayer.insertMusicAt(position, id, title, artist, albumArt, duration, audioSrc)

// Remove music by ID
musicPlayer.removeMusicById(id)
```

## Future Enhancements

- Playlist persistence using LocalStorage
- Shuffle and repeat modes
- Queue management
- Playlist creation and management
- Search and filter functionality
- Drag-and-drop reordering

---

**Note**: This is a client-side application. All music files are stored in browser memory and will be cleared when the page is refreshed.
