import { HiViewGrid } from "react-icons/hi";
import { MdViewStream } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
export default function SideBar({ sideOpen, switchView, listGroupView, handleModal }) {
  return (
    <div
      className={`flex ${
        sideOpen ? "w-72 " : "w-0 scale-0"
      } h-auto flex-col shadow-sm transition-all duration-500`}
    >
      <div className="h-full items-start">
        <div className="flex h-12 w-full items-center transition-all duration-200 hover:bg-slate-800 hover:text-gray-200">
          <button
            className={` group flex w-full items-center whitespace-nowrap p-4 text-left`}
            onClick={(e) => switchView()}
          >
            View
            {listGroupView ? (
              <HiViewGrid className="m-1 h-6 w-6 scale-0 fill-gray-200 transition-all duration-200 group-hover:scale-100" />
            ) : (
              <MdViewStream className="m-1 h-6 w-6 scale-0 fill-gray-200 transition-all duration-200 group-hover:scale-100" />
            )}
          </button>
        </div>
        <div className=" flex  h-12 w-full items-center transition-all duration-200 hover:bg-slate-800 hover:text-gray-200">
          <button
            className={` group flex w-full  items-center whitespace-nowrap p-4 text-left transition-all duration-200 ${
              sideOpen ? "" : ""
            }`}
            onClick={(e) => handleModal()}
          >
            Style Guide
            <FaCircleInfo className="m-1 h-6 w-6 scale-0 fill-gray-200 transition-all duration-200 group-hover:scale-90" />
          </button>
        </div>
        <div className="flex h-12 w-full items-center transition-all duration-200 hover:bg-slate-800 hover:text-gray-200">
          <button className="group flex w-full whitespace-nowrap p-4 text-left">
            Dark Mode
            <FaRegMoon className="mx-1 h-6 w-6 mt- scale-0 fill-gray-200 transition-all duration-200 group-hover:scale-75" />
          </button>
        </div>
      </div>
    </div>
  );
}
