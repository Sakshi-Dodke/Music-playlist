import React from "react";
import SongItem from "./SongItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Playlist({ title, songs, deleteSong, reorderSongs, toggleFavorite, isFavorites }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    reorderSongs(result.source.index, result.destination.index);
  };

  return (
    <div className="playlist">
      <h2>{title}</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="songs">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {songs.map((song, index) => (
                <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SongItem
                        song={song}
                         songId={song.id}  
                        deleteSong={deleteSong}
                        toggleFavorite={toggleFavorite}
                        isFavorites={isFavorites}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Playlist;
