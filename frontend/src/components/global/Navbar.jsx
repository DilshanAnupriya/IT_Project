import { FaArrowDown, FaBell, FaMessage, FaUser } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { useState } from "react";

/**
 * NavBar component that renders a responsive navigation bar with user info, date,
 * icons, and a search bar. It includes a dropdown menu for user profile actions.
 *
 * @param {Object} props - The properties passed to the NavBar component.
 * @param {Function} props.searchfunction - Function to handle the search query from the search bar.
 * @param {Object} props.user - Object representing the logged-in user details.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.role - The role of the user (e.g., Admin, User).
 *
 * @returns {JSX.Element} The NavBar component.
 */
const NavBar = ({ searchfunction, user }) => {
  // State to manage the visibility of the profile dropdown
  const [display, setDisplay] = useState(false);

  /**
   * Toggles the visibility of the profile dropdown menu.
   */
  const displayProfile = () => {
    setDisplay(!display);
  };

  // Current date information
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Add +1 to make the month user-friendly (1-12)
  const date = currentDate.getDate();

  return (
    <nav className="bg-transparent w-full h-16 flex items-center justify-between px-6 lg:px-12">
      {/* Left Section: Date and Greeting */}
      <div className="flex items-center space-x-4">
        <div className="text-gray-800">
          <p className="text-sm font-semibold">Hello, {user?.name || "User"}</p>
          <p className="text-xs text-gray-500">
            Today is #{date}, #Month {month}, #Year {year}
          </p>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 max-w-md">
        <SearchBar searchfunction={searchfunction} />
      </div>

      {/* Right Section: Icons and User Profile */}
      <div className="flex items-center space-x-4 text-gray-600">
        <FaBell className="cursor-pointer hover:text-gray-800 transition" />
        <FaMessage className="cursor-pointer hover:text-gray-800 transition" />
        <FaUser className="cursor-pointer hover:text-gray-800 transition" />
        <div className="relative">
          {/* User Information */}
          <div className="flex items-center cursor-pointer" onClick={displayProfile}>
            <div className="text-sm text-gray-700">
              <p>{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
            </div>
            <FaArrowDown className="ml-2" />
          </div>

          {/* Dropdown Menu */}
          {display && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
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


export default NavBar;
