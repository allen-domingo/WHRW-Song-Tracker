import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function ListGroup({ songList, handleDelete, darkMode }) {
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);

  // displays message if there are no songs
  const getMessage = () => {
    return (
      songList.length === 0 && (
        <p className="py-4 text-center text-3xl">No Songs Found</p>
      )
    );
  };

  //maps song list to list group
  return (
    <div className="mt-24">
      {getMessage()}
      <ul className="list-group shadow-md">
        {songList.map((song: string, index: number) => (
          <a
            href="#"
            className={`group bottom-12 mb-1 ml-3 mr-4 mt-2 transform overflow-hidden border-b-8  border-r-8 border-solid bg-zinc-100 bg-clip-padding px-3 py-2 font-newFont text-black no-underline transition duration-200 hover:scale-95 dark:border-zinc-100 dark:border-opacity-5 dark:bg-black dark:text-zinc-100 ${
              darkMode ? "" : "border-black border-opacity-50"
            }`}
            aria-current="true"
            onMouseEnter={() => {
              setSelectedIndex(index);
            }}
            onMouseLeave={() => {
              setSelectedIndex(NaN);
            }}
          >
            <div className="w-100 justify-content-between hover:scale-y-1 flex items-center transition-all ease-linear">
              <h5 className="select-text font-bold dark:text-zinc-100">
                {song.songName}
              </h5>
              <small className="select-none dark:text-zinc-100">
                {song.timePlayed}
              </small>
            </div>
            <p className="mb-1 select-text text-lg dark:text-zinc-100">
              {song.artist}
            </p>
            <small className="select-text dark:text-zinc-100">
              {song.album}{" "}
            </small>
            <button
              className="float-right mt-0  rounded-full bg-transparent transition-all duration-200"
              onClick={() => {
                handleDelete(selectedIndex);
                setSelectedIndex(NaN);
              }}
            >
              <RiDeleteBin6Line className=" scale-0 transition-all group-hover:scale-150 dark:fill-slate-100" />
            </button>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
