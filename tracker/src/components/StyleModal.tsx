export default function StyleModal({ modalOpen, handleModal }) {
  return (
    <div
      onClick={handleModal}
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-150  ${
        modalOpen ? "visible z-40 bg-black/20" : "invisible"
      }`}
    >
      <div
        className={`texct m-14 rounded-lg bg-emerald-500 p-7 text-emerald-800 ${
          modalOpen ? "scale-100" : "scale-0"
        }`}
      >
        <strong className="block text-center text-xl">Style Guide</strong>

        <li className="pt-3">
          When recording songs that are purely singles, leave album as blank
        </li>
        <li className="pt-3">
          Leave out features in songs for song titles
        </li>
        <li className="pt-3">
          For songs with multiple artists, name only the first artist
        </li>
      </div>
    </div>
  );
}
