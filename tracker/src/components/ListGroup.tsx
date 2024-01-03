import { useState } from "react";

function ListGroup({ songList, handleDelete }) {
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);


  const getMessage = () => {
    return (
      songList.length === 0 && (
        <p className="py-4 text-center text-3xl">No Songs Found</p>
      )
    );
  };


  return (
    <>
      {getMessage()}
      <ul className="list-group shadow-md">
        {songList.map((song, index: number) => (
          <a
            href="#"
            className="group w-full transform overflow-hidden  rounded-xl border-4 border-transparent bg-slate-700 px-3 py-1 font-sans text-white no-underline shadow-lg transition duration-150 ease-linear hover:bg-slate-800  "
            aria-current="true"
            onMouseEnter={() => {
              setSelectedIndex(index);
            }}
            onMouseLeave={() => {
              setSelectedIndex(NaN);
            }}
          >
            <div className="w-100 justify-content-between hover:scale-y-1 flex items-center transition-all ease-linear">
              <h5 className="mb-1 ">
                {song.songName}
                {/*  | {song.artist} | {song.album} */}
              </h5>
              <small>{song.timePlayed}</small>
            </div>
            <p className="mb-1 text-lg">{song.artist}</p>
            <small>{song.album} </small>
            <div className=" h-0 transition-all group-hover:h-12 ">
              <button
                className="my-2 scale-0 rounded-md bg-red-500 px-3 py-2 font-bold text-white transition ease-in-out  hover:bg-red-700  group-hover:scale-100"
                onClick={() => {
                  handleDelete(selectedIndex);
                  setSelectedIndex(NaN);
                }}
              >
                <img src="/spotify.png" alt=""></img>X
              </button>
            </div>
          </a>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
