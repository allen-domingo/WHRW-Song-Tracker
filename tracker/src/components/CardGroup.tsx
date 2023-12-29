import { useState, useEffect } from "react";
import musicImg from "../assets/WHRW_logo.png";
function CardGroup({ songList }) {
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);

  const getMessage = () => {
    return songList.length === 0 ? (
      <p className="py-4 text-center text-3xl">No Songs Found</p>
    ) : null;
  };
  /*   const getAlbum = (song) => {
    return song.album != "N/A" ? (
      <p className="text-sm text-gray-700">{song.album}</p>
    ) : (
      <p className="text-sm text-gray-700"> _______ </p>
    );
  }; */

 const fontStyle = {
    fontFamily: "verdana",
 }

  return (
    <>
      {getMessage}
      <div className="container grid grid-cols-4 py-5">
        {songList.map((song, index) => (
          <div className="max-w-sm scale-90 overflow-hidden truncate rounded py-3 shadow-lg transition-all duration-200 hover:scale-100">
            <img
              className="w-full scale-90 shadow-md transition-all duration-500 hover:scale-95"
              src={song.image}
              alt="Album Cover"
            />
            <div className="px-6 py-2 pr-3 object-scale-down" style={fontStyle}>
              <div className="mb-1 text-2xl font-bold text-ellipsis line-clamp-2"> {song.songName}</div>
              <p className="mb-1 overflow-clip text-xl text-gray-700 hover:overflow-auto">
                {song.artist}
              </p>
              <p className=" text-gray-700">{song.album}</p>
              <small className="mt-1">{song.timePlayed}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default CardGroup;
