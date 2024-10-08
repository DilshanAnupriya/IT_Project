// Navbar_profile.js
import { FaArrowDown, FaBell, FaMessage, FaUser } from "react-icons/fa6";
import { useState } from "react";

const Navbar_suwani = ({ searchfunction, user }) => {
  const [display, setDisplay] = useState(false);

  const displayProfile = () => {
    setDisplay(!display);
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  return (
    <nav className="bg-white w-full h-16 fixed top-0 z-50 shadow flex items-center justify-between px-6 lg:px-12">
      <div className="flex items-center space-x-4">
        <div className="text-gray-800">
          <p className="text-sm font-semibold">Hello, {user?.name || "Suwini"}</p>
          <p className="text-xs text-gray-500">
            Today : {date} : {month} : {year}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-gray-600">
        <FaBell className="cursor-pointer hover:text-gray-800 transition" />
        <FaMessage className="cursor-pointer hover:text-gray-800 transition" />
        <FaUser className="cursor-pointer hover:text-gray-800 transition" />
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={displayProfile}>
            <div className="text-sm text-gray-700">
              <p>{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
            </div>
            <FaArrowDown className="ml-2" />
          </div>

          {display && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar_suwani;