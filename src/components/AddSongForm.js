import React, { useState } from "react";

function AddSongForm({ addSong }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist) return;
    addSong({ title, artist, link });
    setTitle("");
    setArtist("");
    setLink("");
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="url"
        placeholder="Song Link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Add Song</button>
    </form>
  );
}

export default AddSongForm;
