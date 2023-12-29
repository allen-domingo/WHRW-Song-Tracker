import { useState } from "react";

function ListGroup({ songList, handleDelete }) {
  const [selectedIndex, setSelectedIndex] = useState(Number.POSITIVE_INFINITY);
  //const [songList, setsongList] = useState(-1);

  const getMessage = () => {
    return songList.length === 0 && <p className="text-center py-4 text-3xl">No Songs Found</p>;
  };

  const buttonStyle = {
    padding: 10,
  };

  const headStyle = {
    padding: 10,
  };

  return (
    <>
      {/* <h1 style={headStyle}></h1> */}
      {getMessage()}
      <ul className="list-group shadow-md">
        {songList.map((song, index) => (
          <a
            href="#"
            className="w-full transform overflow-hidden  rounded-xl border-4 border-transparent bg-slate-700 px-3 py-1 font-sans text-white no-underline shadow-lg transition duration-200 ease-linear hover:scale-90 hover:bg-slate-800  "
            aria-current="true"
            onMouseEnter={() => {
              setSelectedIndex(index);
            }}
            onMouseLeave={() => {
              setSelectedIndex(NaN);
            }}
          >
            <div className="w-100 justify-content-between hover:scale-y-1 flex items-center transition-all duration-300 ease-linear">
              <h5 className="mb-1 ">
                {song.songName}{/*  | {song.artist} | {song.album} */}
              </h5>
              <small>{song.timePlayed}</small>
            </div>
             <p className="mb-1 text-lg">{song.artist}</p>
            <small>{song.album} </small>
            <div>
              {selectedIndex === index ? (
                <>
                  <button
                    className="rounded-md bg-red-500 px-3 py-2 my-2 font-extrabold text-white transition  ease-in-out  hover:bg-red-700"
                    onClick={() => {
                      handleDelete(selectedIndex);
                      setSelectedIndex(NaN);
                    }}
                  >
                    <img src="/spotify.png" alt=""></img>X
                  </button>
                </>
              ) : null}
            </div>
          </a>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
