import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import CardGroup from "./components/CardGroup";
import StyleModal from "./components/StyleModal";

import SideBar from "./components/SideBar";

function App() {
  const [allSongs, setAllSongs] = useState([]);
  const [listGroupView, setListGroupView] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function addFromNav(songData: {
    image: string;
    songName: string;
    artist: string;
    album: string;
    timePlayed: string;
  }) {
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
    if (listGroupView) {
      setListGroupView(false);
    } else {
      setListGroupView(true);
    }
  }
  function handleModal() {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }
  function handleSide() {
    if (sideOpen) {
      setSideOpen(false);
    } else {
      setSideOpen(true);
    }
  }

  useEffect(() => {
    var songs_init = JSON.parse(localStorage.getItem("songs") || "");
    var view_init = JSON.parse(localStorage.getItem("viewState") || "true");
    songs_init && setAllSongs(songs_init);
    setListGroupView(view_init);
    console.log(songs_init);
  }, []);
  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(allSongs));
  }, [allSongs]);
  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(listGroupView));
  }, [listGroupView]);

  return (
    <div className="flex bg-gray-200">
      <SideBar
        sideOpen={sideOpen}
        switchView={switchView}
        listGroupView={listGroupView}
        handleModal={handleModal}
      />
      <div className=" inline-block w-screen">
        <NavBar
          addFromNav={addFromNav}
          switchView={switchView}
          handleSide={handleSide}
          sideOpen={sideOpen}
        />

        {listGroupView ? (
          <ListGroup handleDelete={handleDelete} songList={allSongs}/>
        ) : (
          <CardGroup handleDelete={handleDelete} songList={allSongs} />
        )}
        <StyleModal modalOpen={modalOpen} handleModal={handleModal} />
        {/* <SelfDestruct /> */}
      </div>
    </div>
  );
}

export default App;
