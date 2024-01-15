import { useEffect, useState } from "react";
import musicImg from "../assets/WHRW_logo.png";
import whrwsvg from "../assets/whrwsvg.svg";
import SpotifyWebApi from "./spotify-web-api.js";
import { SiRoblox } from "react-icons/si";
import { ImLinkedin } from "react-icons/im";

function NavBar({ addFromNav, switchView, handleSide, sideOpen }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [image, setImage] = useState("");
  const [subNum, setSubNum] = useState(0);

  const logoStyle = {
    fontFamily: "papyrus",
  };
  const inputStyle = {
    justifyContent: "center",
    fontFamily: "Gill Sans MT",
  };

  const CLIENT_ID = "e4bde08194004aa8a268030612b16410";

  const CLIENT_SECRET = "0173bbc5a4304ac2b99ba7fda4acafad";
  const [token, setToken] = useState("");

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    var spotifyApi = new SpotifyWebApi();

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
    var searchQuery;
    if (album) {
      searchQuery = artist + " " + album;
    } else {
      searchQuery = artist + " " + song;
    }

    spotifyApi.setAccessToken(token);
    console.log(album);
    spotifyApi.searchAlbums(searchQuery).then(
      function (data) {
        setImage(data.albums.items[0].images[0].url);
      },
      function (err) {
        console.error(err);
      },
    );
  }, [artist, album]);

  const handleSubmit = (a: string, b: string, c: string, e: Event) => {
    if (a == "" || b == "") {
      if (a == "" && b == "") {
        alert("No song name or artist entered");
      } else if (a == "") {
        alert("No song name entered");
      } else {
        alert("No artist entered");
      }
      e.preventDefault();
      return null;
    }
    if (c == "") {
      c = a;
    }

    var today = new Date();
    var time =
      today.getMonth() +
      1 +
      "/" +
      today.getDate() +
      "/" +
      today.getFullYear() +
      ", " +
      today.toLocaleTimeString();

    time =
      time.substring(0, time.length - 6) +
      time.substring(time.length - 3, time.length);

    let songData = {
      songName: a,
      artist: b,
      album: c,
      timePlayed: time,
      image: image,
    };

    addFromNav(songData);
    e.preventDefault();
    resetInput();
  };
  const resetInput = () => {
    setSong("");
    setArtist("");
    setAlbum("");
    setImage("");
  };

  return (
    <div className="shadow-lg z-10 w-full fixed">
      <nav className=" mx-auto flex max-h-20 content-center items-center bg-gray-500 transition-all duration-300 ">
        <div
          className={` container-fluid flex h-20 w-auto content-center ${
            sideOpen ? " " : ""
          } `}
        >
          <button
            className="m-3"
            onClick={(e) => {
              handleSide();
            }}
          >
            <ImLinkedin className="h-8 w-8 fill-blue-600 transition-all hover:animate-spin" />
          </button>
          <button
            className="m-2 h-16 w-16 fill-green-500 "
            onClick={(e) => {
              switchView();
            }}
          >
            {
              <img
                className=" stroke-2 transition-transform hover:scale-110"
                src={musicImg}
                alt=""
              />
            }
          </button>

          <a
            className={` m-2 flex items-center text-4xl text-black no-underline transition-all ${
              sideOpen ? "" : ""
            }`}
            style={logoStyle}
          >
            <b className=" whitespace-nowrap text-center">Skibidi Tracker</b>
          </a>

          <div
            className={` static flex items-center transition-all`}
            style={inputStyle}
          >
            <form className={`  flex p-2`} role="submit">
              <input
                className="form-control me-2 drop-shadow-md "
                type="Song"
                placeholder="Song"
                aria-label="Song"
                onChange={(e) => setSong(e.target.value)}
                value={song}
              ></input>
              <input
                className="form-control me-2 drop-shadow-md"
                type="Artist"
                placeholder="Artist"
                aria-label="Artist"
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
              ></input>
              <input
                className="form-control me-2 drop-shadow-md"
                type="Album"
                placeholder="Album"
                aria-label="Album"
                onChange={(e) => setAlbum(e.target.value)}
                value={album}
              ></input>
              <button
                className="bg-transparent-500 cursor-pointer rounded-3xl border-2 border-green-600 px-4 py-2 text-green-600 transition-all duration-500 ease-in-out hover:rounded-md  hover:bg-green-600 hover:text-gray-200"
                type="submit"
                onClick={(e) => {
                  setSubNum(subNum + 1);
                  handleSubmit(song, artist, album, e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
