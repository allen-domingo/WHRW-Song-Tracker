import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
export default function SideBar({
  sideOpen,
  switchView,
  listGroupView,
  handleDarkMode,
  handleModal,
  autoCorrect,
  handleAutoCorrect
}) {


  /** 
   * Sidebar to toggle options between card/listview, dark mode, autocorrect, and accessing style guide
   * 
  */
  return (
    <div
      className={`flex bg-transparent ${
        sideOpen ? "w-48 " : "w-0 scale-0"
      } h-auto flex-col shadow-sm transition-all duration-500`}
    >
      <div
        className={`h-full w-full items-start font-newFont font-bold text-black   ${
          sideOpen ? "static" : ""
        }`}
      >
        <div className="flex h-12 w-screen items-center transition-all duration-200 hover:bg-zinc-900 hover:text-gray-200 dark:hover:bg-zinc-100">
          <button
            className={`group flex w-48 items-center whitespace-nowrap p-4 text-left dark:text-zinc-100 dark:hover:text-black`}
            onClick={(e) => switchView()}
          >
            View
            {listGroupView ? (
              <HiViewGrid className="m-1.5 h-6 w-6 scale-0 fill-gray-200 transition-all duration-200 group-hover:scale-100 dark:fill-black" />
            ) : (
              <MdViewStream className="m-1.5 h-6 w-6 scale-0 fill-gray-200 transition-all  duration-200  group-hover:scale-100 dark:fill-black" />
            )}
          </button>
        </div>
        <div className=" flex  h-12 w-full items-center transition-all duration-200 hover:bg-zinc-900 hover:text-gray-200 dark:hover:bg-zinc-100">
          <button
            className={`group flex w-48 items-center  whitespace-nowrap p-4 text-left transition-all duration-200 dark:text-zinc-100 dark:hover:text-black ${
              sideOpen ? "" : ""
            }`}
            onClick={(e) => handleModal()}
          >
            Style Guide
            <FaCircleInfo className="m-1.5 h-6 w-6 scale-0 fill-gray-200  transition-all  duration-200 group-hover:scale-90 dark:fill-black" />
          </button>
        </div>
        <div className="flex h-12 w-full items-center transition-all duration-200 hover:bg-zinc-900 hover:text-gray-200 dark:hover:bg-zinc-100">
          <button
            className="group flex w-48 whitespace-nowrap p-4 text-left dark:text-zinc-100 dark:hover:text-black"
            onClick={(e) => handleDarkMode()}
          >
            Dark Mode
            <FaRegMoon className="mx-1.5 h-6 w-6 scale-0 fill-gray-200  transition-all  duration-200 group-hover:scale-75 dark:fill-black" />
          </button>
        </div>
        <div className="flex h-12 w-full items-center transition-all duration-200 hover:bg-zinc-900 hover:text-gray-200 dark:hover:bg-zinc-100">
          <button className="group flex w-48 whitespace-nowrap p-4 text-left align-baseline dark:text-zinc-100 dark:hover:text-black"
          onClick={(e) => handleAutoCorrect()}>
            {autoCorrect ? (
              <s className="no-underline">Autocorrect: On</s>
            ) : (
              <s className="no-underline">Autocorrect: Off</s>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
