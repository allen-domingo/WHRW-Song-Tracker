import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import CardGroup from "./components/CardGroup";

function App() {
  function addFromNav(songData) {
    console.log(songData);
    let updatedSongList = [...allSongs];
    updatedSongList.unshift(songData);
    setAllSongs(updatedSongList);
    console.log(updatedSongList);
  }
  function handleDelete(index: number) {
    let deletedSongList = [...allSongs];
    deletedSongList.splice(index, 1);
    setAllSongs(deletedSongList);
  }

  function switchView() {
    console.log("switch");
    if (listGroupView) {
      setListGroupView(false);
    } else {
      setListGroupView(true);
    }
  }

  const [allSongs, setAllSongs] = useState([]);
  const [listGroupView, setListGroupView] = useState(true);

  useEffect(() => {
    // storing input name
    var songs_init = JSON.parse(localStorage.getItem("songs") || "");
    var view_init = JSON.parse(localStorage.getItem("viewState") || "");
    setAllSongs(songs_init);
    setListGroupView(view_init);
    console.log(songs_init);
  }, []);
  useEffect(() => {
    // storing input name
    localStorage.setItem("songs", JSON.stringify(allSongs));
  }, [allSongs]);
  useEffect(() => {
    // storing input name
    localStorage.setItem("viewState", JSON.stringify(listGroupView));
  }, [listGroupView]);

  return (
    <div className="bg-gray-200">
      <NavBar addFromNav={addFromNav} switchView={switchView} />
      {listGroupView ? (
        <ListGroup handleDelete={handleDelete} songList={allSongs} />
      ) : (
        <CardGroup songList={allSongs} />
      )}
    </div>
  );
}

export default App;
