export default function StyleModal({ modalOpen, handleModal }) {
  return (
    <div
      onClick={handleModal}
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-150  ${
        modalOpen ? "visible z-40 bg-black/40" : "invisible"
      }`}
    >
      <div
        className={`m-14 rounded-sm border-solid dark:border-opacity-10 bg-zinc-100 p-7 border-opacity-70 font-newFont text-black dark:border-slate-100 dark:bg-black ${
          modalOpen
            ? "scale-100 border-b-8 border-r-8 border-gray-900"
            : "scale-0"
        }`}
      >
        <strong className="block text-center text-xl dark:text-zinc-100">
          Style Guide
        </strong>
        <ul className="list-disc">
          <li className="pt-3 dark:text-zinc-100">
            When recording songs that are purely singles, leave album as blank
          </li>
          <li className="pt-3 dark:text-zinc-100">
            Leave out features in songs plsplsplspls
          </li>

          <li className="pt-3 dark:text-zinc-100">
            For songs with multiple artists, name only the first artist
          </li>
        </ul>
        <li className="list-none dark:text-zinc-100">
          Thank u from the MD Team :3
        </li>
        <li className="list-none dark:text-zinc-100">
          Questions? Contact Allen at mdassistant@whrwfm.org.
        </li>
      </div>
    </div>
  );
}
