import { useState } from "react";

function CardGroup({ songList, handleDelete }) {
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);

  const getMessage = () => {
    return (
      songList.length === 0 && (
        <p className="py-4 text-center text-3xl">No Songs Found</p>
      )
    );
  };

  const fontStyle = {
    fontFamily: "Gill Sans MT",
  };


  return (
    <>
      {getMessage}
      <div className="container grid grid-cols-4 py-5">
        {songList.map(
          (
            song: {
              image: string;
              songName: string;
              artist: string;
              album: string;
              timePlayed: string;
            },
            index: number,
          ) => (
            <div
              className="group max-w-sm scale-90 overflow-hidden truncate rounded py-3 shadow-lg transition-all duration-200 hover:scale-100"
              onMouseEnter={() => {
                setSelectedIndex(index);
              }}
              onMouseLeave={() => {
                setSelectedIndex(NaN);
              }}
            >
              <img
                className="w-full scale-90 shadow-md transition-all duration-500 hover:scale-95"
                src={song.image}
                alt="Album Cover"
              />
              <div
                className="object-scale-down px-6 py-2 pr-3"
                style={fontStyle}
              >
                <div className="mb-1 line-clamp-2 text-ellipsis text-2xl font-bold">
                  {" "}
                    {song.songName}
                  
                </div>
                <p className="mb-1 overflow-clip text-xl text-gray-700 hover:overflow-auto">
                  {song.artist}
                </p>
                <p className=" text-gray-700">{song.album}</p>
                <small className="mt-1">{song.timePlayed}</small>

                <button
                  className="ml-24 scale-0 rounded-full border-2 border-gray-400 bg-transparent px-2 py-1 font-extrabold text-gray-400 opacity-55 transition-all duration-200 hover:opacity-100  group-hover:scale-90"
                  onClick={() => {
                    handleDelete(selectedIndex);
                    setSelectedIndex(NaN);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
}
export default CardGroup;
