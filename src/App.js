import React, { useState, useEffect } from "react";
import AddSongForm from "./components/AddSongForm";
import Playlist from "./components/Playlist";
import "./App.css";

function App() {
  // Load saved songs from localStorage or start with empty array
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("playlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Save playlist to localStorage whenever songs change
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(songs));
  }, [songs]);

  // Add new song with unique ID
  const addSong = (song) => {
    const newSong = { ...song, favorite: false, id: Date.now() };
    setSongs([...songs, newSong]);
  };

 // Delete song by id
const deleteSong = (id) => {
  setSongs(songs.filter((song) => song.id !== id));
};

  // Reorder songs
  const reorderSongs = (startIndex, endIndex) => {
    const newSongs = Array.from(songs);
    const [removed] = newSongs.splice(startIndex, 1);
    newSongs.splice(endIndex, 0, removed);
    setSongs(newSongs);
  };

 // Toggle favorite by id
const toggleFavorite = (id) => {
  setSongs(
    songs.map((song) =>
      song.id === id ? { ...song, favorite: !song.favorite } : song
    )
  );
};

  return (
    <div className="app">
      <h1>🎶 Music Playlist Organizer</h1>

      <AddSongForm addSong={addSong} />

      <button
        className="playlist-btn"
        onClick={() => {
          setShowPlaylist(!showPlaylist);
          setShowFavorites(false);
        }}
      >
        {showPlaylist ? "Hide Playlist" : "My Playlist"}
      </button>

      <button
        className="playlist-btn"
        onClick={() => {
          setShowFavorites(!showFavorites);
          setShowPlaylist(false);
        }}
      >
        {showFavorites ? "Hide Favorites" : "My Favorites"}
      </button>

      {showPlaylist && (
        <Playlist
          title="My Playlist"
          songs={songs}
          deleteSong={deleteSong}
          reorderSongs={reorderSongs}
          toggleFavorite={toggleFavorite}
          isFavorites={false}
        />
      )}

      {showFavorites && (
        <Playlist
          title="My Favorites"
          songs={songs.filter((s) => s.favorite)}
          deleteSong={deleteSong}
          reorderSongs={reorderSongs}
          toggleFavorite={toggleFavorite}
          isFavorites={true}
        />
      )}
    </div>
  );
}

export default App;
