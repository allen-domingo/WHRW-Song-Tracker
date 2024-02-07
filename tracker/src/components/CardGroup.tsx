import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function CardGroup({ songList, handleDelete, darkMode }) {
  //for showing which card mouse is hovering over
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);

  //default for no songs
  const getMessage = () => {
    return (
      songList.length == 0 && (
        <p className="py-4 text-center text-3xl">No Songs Found</p>
      )
    );
  };

  //creates marquee when a card with a long song/album name is hovered over
  const marqueeSongToggle = (s: string, isName: boolean) => {
    if (s.length > 21 && s.length < 32 && isName) {
      return (
        <div className="whitespace-nowrap group-hover:animate-marquee2">
          {s}
        </div>
      );
    } else if (s.length > 32 && isName) {
      return <div className="group-hover:animate-marquee2">{s}</div>;
    } else if (s.length > 31) {
      return (
        <div className="text-clip group-hover:animate-marquee group-hover:whitespace-nowrap">
          {s}
        </div>
      );
    } else {
      return s;
    }
  };

  //card view w album

  return (
    <>
      {getMessage}
      <div className="container mt-11 grid grid-cols-4 py-5">
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
              className={`group max-w-sm scale-90 overflow-hidden border-b-8 border-r-8 border-solid bg-zinc-100  bg-clip-padding   py-3 font-newFont text-black transition-all duration-200 hover:scale-100 dark:border-white dark:border-opacity-5 ${
                darkMode ? "" : "border-black border-opacity-50"
              }  dark:bg-black dark:text-zinc-100`}
              onMouseEnter={() => {
                setSelectedIndex(index);
              }}
              onMouseLeave={() => {
                setSelectedIndex(NaN);
              }}
            >
              <img
                className="w-full scale-90 transition-all duration-500 hover:scale-95"
                src={song.image}
                alt="Album Cover"
              />
              <div className="object-scale-down px-6 py-2 pr-3 dark:text-zinc-100 ">
                <div className="mb-1 line-clamp-1 whitespace-nowrap text-2xl font-bold dark:text-zinc-100">
                  {" "}
                  {marqueeSongToggle(song.songName, true)}
                </div>
                <p className="mb-1 overflow-clip text-xl  hover:overflow-auto dark:text-zinc-100">
                  {song.artist}
                </p>
                <p className=" line-clamp-1 text-lg dark:text-zinc-100 ">
                  {marqueeSongToggle(song.album, false)}
                </p>
                <small className="mt-1 dark:text-zinc-100">
                  {song.timePlayed}
                </small>
                <button
                  className="float-right mx-2 scale-0 rounded-full  bg-transparent px-2.5 py-1 text-start font-extrabold text-zinc-950 opacity-55 transition-all duration-200 hover:opacity-100 group-hover:scale-90   "
                  onClick={() => {
                    handleDelete(selectedIndex);
                    setSelectedIndex(NaN);
                  }}
                >
                  <RiDeleteBin6Line className="scale-0 transition-all group-hover:scale-150 dark:fill-slate-100" />
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
