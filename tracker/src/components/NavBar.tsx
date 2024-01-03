import { useEffect, useState } from "react";
import musicImg from "../assets/WHRW_logo.png";
import SpotifyWebApi from "./spotify-web-api.js";
function NavBar({ addFromNav, switchView }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [image, setImage] = useState("");
  const [subNum, setSubNum] = useState(0);

  const logoStyle = {
    fontSize: 40,
    fontFamily: "papyrus",
  };
  const inputStyle = {
    justifyContent: "center",
  };

  const CLIENT_ID = "e4bde08194004aa8a268030612b16410";

  const CLIENT_SECRET = "c7c6af7b238146cbab83f4d02b445cd3";
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
    <>
      <nav className="navbar bg-slate-600">
        <div className="container" style={{ margin: "auto" }}>
          <a className="text-black no-underline" style={logoStyle}>
            <b>Skibidi Tracker</b>
          </a>
          <button
            style={{ height: "5%", width: "5%" }}
            onClick={(e) => {
              switchView();
            }}
          >
            <img
              className="transition-transform hover:scale-110"
              src={musicImg}
              alt=""
            />
          </button>

          <div style={inputStyle}>
            <form className="d-flex" role="submit">
              <input
                className="form-control me-2 drop-shadow-md"
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
                className="bg-transparent-500 cursor-pointer rounded-3xl border-2 border-green-500 px-4 py-2 text-green-500 transition-all duration-500 ease-in-out hover:rounded-md  hover:bg-green-500 hover:text-gray-100"
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
    </>
  );
}

export default NavBar;
