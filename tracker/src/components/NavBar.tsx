import { useEffect, useState } from "react";
import musicImg from "../assets/WHRW_logo.png";
import SpotifyWebApi from "./spotify-web-api.js";
import EnterSheets from "./EnterSheets.js";
import UseAnimations from "react-useanimations";
import settings2 from "react-useanimations/lib/settings2";

function NavBar({
  addFromNav,
  switchView,
  handleSide,
  sideOpen,
  darkMode,
  autoCorrect,
  sheetsKey,
}) {
  //song input info
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  //song spotify info for autocorrect/album view
  const [image, setImage] = useState("");
  const [spotArtist, setSpotArtist] = useState("");
  const [spotSong, setSpotSong] = useState("");
  const [spotAlbum, setSpotAlbum] = useState("");
  const [relaseDate, setReleaseDate] = useState("");

  var spotifyApi = new SpotifyWebApi();

  const CLIENT_ID = "ID";

  const CLIENT_SECRET = "SECRET";
  //spotify auth token
  const [token, setToken] = useState("");

  useEffect(() => {
    //Spotify api call for auth, searching, and setting song infor

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

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
    var searchQuery;
    if (album) {
      searchQuery = song + " " + album + " " + artist;
    } else {
      searchQuery = artist + " " + song;
    }

    spotifyApi.setAccessToken(token);
    spotifyApi.searchTracks(searchQuery).then(
      function (data) {
        setSpotAlbum(data.tracks.items[0].album.name);
        setSpotArtist(data.tracks.items[0].artists[0].name);
        setSpotSong(data.tracks.items[0].name);
        setReleaseDate(data.tracks.items[0].album.release_date);

        setImage(data.tracks.items[0].album.images[0].url);
      },
      function (err) {
        console.error(err);
      },
    );
  }, [artist, album]);

  const handleSubmit = (a: string, b: string, c: string, e: Event) => {
    //checks for song/artist
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
    //gets timestamp
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

    //sets info to search result if toggled on
    if (autoCorrect) {
      a = spotSong;
      b = spotArtist;
      c = spotAlbum;
    }
    //sets up data for adding to song list

    let songData = {
      songName: a,
      artist: b,
      album: c,
      timePlayed: time,
      image: image,
    };
    //adds to list/sheet and resets
    EnterSheets(a, b, c, time, relaseDate, sheetsKey);
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
    <div className="fixed z-10 w-full border-b-4 border-zinc-900 border-opacity-90 dark:border-zinc-200">
      <nav className=" mx-auto flex max-h-20 content-center items-center bg-zinc-200 transition-all duration-300 dark:bg-black ">
        <div
          className={` container-fluid flex h-20 w-auto content-center ${
            sideOpen ? " " : ""
          } `}
        >
          <button
            className="m-3 dark:fill-slate-100"
            onClick={(e) => {
              handleSide();
            }}
          >
            <UseAnimations
              animation={settings2}
              size={56}
              strokeColor={`${darkMode ? "white" : "black"}`}
              className="rotate-90 transition-all hover:scale-125"
            />
          </button>
          <button
            className="m-2 h-16 w-16 "
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
            className={` m-2 flex items-center font-newFont text-4xl text-black  no-underline transition-all ${
              sideOpen ? "" : ""
            }`}
          >
            <b className=" whitespace-nowrap text-center dark:text-zinc-100">
              Song Tracker
            </b>
          </a>

          <div className={`flex items-center font-newFont transition-all`}>
            <form className={`flex p-2`} id="songForm" role="submit">
              <input
                className="form-control me-2 shadow-inner "
                type="Song"
                placeholder="Song"
                aria-label="Song"
                onChange={(e) => setSong(e.target.value)}
                value={song}
              ></input>
              <input
                className="form-control me-2 shadow-inner "
                type="Artist"
                placeholder="Artist"
                aria-label="Artist"
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
              ></input>
              <input
                className="form-control me-2 shadow-inner"
                type="Album"
                placeholder="Album"
                aria-label="Album"
                onChange={(e) => setAlbum(e.target.value)}
                value={album}
              ></input>
              <button
                className={`cursor-pointer rounded-3xl border-2 px-4 py-2 transition-all duration-500 ease-in-out hover:rounded-md   dark:text-zinc-200 ${
                  darkMode
                    ? "border-zinc-100 hover:border-zinc-200 hover:bg-slate-100 hover:text-black"
                    : " border-black hover:bg-black hover:text-gray-100"
                }`}
                type="submit"
                onClick={(e) => {
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
