import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import CardGroup from "./components/CardGroup";
import StyleModal from "./components/StyleModal";
import SideBar from "./components/SideBar";
import GoogleAuth from "./components/GoogleAuth.js";

function App() {
  const [allSongs, setAllSongs] = useState([]);
  const [listGroupView, setListGroupView] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoCorrect, setAutoCorrect] = useState(true);
  const [sheetsKey, setSheetsKey] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  //adds song from navbar input
  function addFromNav(songData: {
    image: string;
    songName: string;
    artist: string;
    album: string;
    timePlayed: string;
  }) {
    let updatedSongList = [...allSongs];
    updatedSongList.unshift(songData);
    setAllSongs(updatedSongList);
    console.log(updatedSongList);
  }
  //delets song off list
  function handleDelete(index: number) {
    let deletedSongList = [...allSongs];
    deletedSongList.splice(index, 1);
    setAllSongs(deletedSongList);
  }

  //switches between card/list view
  function switchView() {
    setListGroupView(!listGroupView);
  }
  //opens and closes style guide
  function handleModal() {
    setModalOpen(!modalOpen);
  }
  //opens and closes side bar
  function handleSide() {
    setSideOpen(!sideOpen);
  }
  //switches dark and light mode
  function handleDarkMode() {
    setDarkMode(!darkMode);
  }
  //toggles autocorrect
  function handleAutoCorrect() {
    setAutoCorrect(!autoCorrect);
  }
  //sets google auth token
  function helperKey(token: string) {
    setSheetsKey(token);
  }

  //initializes song list, dark mode, and previous view
  useEffect(() => {
    GoogleAuth(helperKey);
    console.log("THE TOKEN: " + sheetsKey);
    var songs_init = JSON.parse(localStorage.getItem("songs") || "");
    var view_init = JSON.parse(localStorage.getItem("viewState") || "true");
    var dark_mode_init = JSON.parse(
      localStorage.getItem("darkMode?") || "false",
    );
    songs_init && setAllSongs(songs_init);
    setListGroupView(view_init);
    setDarkMode(dark_mode_init);
    console.log(songs_init);
  }, []);
  //saves song list
  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(allSongs));
  }, [allSongs]);
  //saves view setting
  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(listGroupView));
  }, [listGroupView]);
  //saves dark mode setting
  useEffect(() => {
    localStorage.setItem("darkMode?", JSON.stringify(darkMode));
  }, [darkMode]);

  //checks time and updates token every 10 minutes
  useEffect(() => {
    let timer = setInterval(() => setCurrentTime(new Date()), 600000);
    let timer2 = setInterval(() => GoogleAuth(helperKey), 600000);

    return function cleanup() {
      clearInterval(timer);
      clearInterval(timer2);
    };
  });

  return (
    <div
      className={`flex overflow-hidden bg-zinc-100  transition-all ${
        darkMode && "dark bg-black"
      }`}
    >
      <SideBar
        sideOpen={sideOpen}
        switchView={switchView}
        listGroupView={listGroupView}
        handleModal={handleModal}
        handleDarkMode={handleDarkMode}
        autoCorrect={autoCorrect}
        handleAutoCorrect={handleAutoCorrect}
      />
      <div className="inline-block w-screen bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <NavBar
          addFromNav={addFromNav}
          switchView={switchView}
          handleSide={handleSide}
          sideOpen={sideOpen}
          darkMode={darkMode}
          autoCorrect={autoCorrect}
          sheetsKey={sheetsKey}
        />

        {listGroupView ? (
          <ListGroup
            handleDelete={handleDelete}
            songList={allSongs}
            darkMode={darkMode}
          />
        ) : (
          <CardGroup
            handleDelete={handleDelete}
            songList={allSongs}
            darkMode={darkMode}
          />
        )}
        <StyleModal modalOpen={modalOpen} handleModal={handleModal} />
      </div>
    </div>
  );
}

export default App;
