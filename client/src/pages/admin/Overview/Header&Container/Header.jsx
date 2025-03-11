import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import SideBar from "../../SideBar/SideBar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleSidebar} className="p-2 bg-gray-100 rounded-lg">
          <FaBars className="text-gray-600 size-5" />
        </button>
      </div>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Search Box */}
      <div className="relative hidden md:flex w-full max-w-[24rem]">
        <CiSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none h-10 w-full border border-gray-300 rounded-md pl-10 pr-4"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        <HiOutlineChatAlt className="text-gray-600 size-6 hover:text-gray-800 cursor-pointer" />
        <HiOutlineBell className="text-gray-600 size-6 hover:text-gray-800 cursor-pointer" />
        <FaRegUserCircle className="text-gray-600 size-6 hover:text-gray-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
