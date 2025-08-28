import React from "react";

function SongItem({ song, songId, deleteSong, toggleFavorite, isFavorites }) {
  const handleRemove = () => {
    if (isFavorites) {
      toggleFavorite(songId); // ✅ toggle favorite using id
    } else {
      deleteSong(songId);     // ✅ delete song using id
    }
  };

  return (
    <div className="song-item">
      <div>
        <strong>{song.title}</strong> – {song.artist}
        {song.link && (
          <a href={song.link} target="_blank" rel="noreferrer" style={{ marginLeft: "10px" }}>
            ▶ Play
          </a>
        )}
      </div>

      <div>
        <button onClick={() => toggleFavorite(songId)} style={{ marginRight: "10px" }}>
          {song.favorite ? " Unfavorite" : " Favorite"}
        </button>

        <button onClick={handleRemove}>
          {isFavorites ? "Remove from Favorites" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default SongItem;
