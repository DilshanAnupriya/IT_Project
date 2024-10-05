import { FaHome, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdWidgets } from "react-icons/md"; // Assuming the second icon represents a grid layout or widgets
import { IoToggle } from "react-icons/io5"; // Icon representing the toggle button

/**
 * Sidebar component that displays a vertical menu with icons for navigation.
 * It includes sections for user actions (home, dashboard, user, settings, etc.)
 * and provides hover effects for a responsive and interactive experience.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
  return (
    <div className="h-screen w-16 bg-white flex flex-col items-center py-4 space-y-8 shadow-lg">
      
      {/* Top Section: Home and Dashboard icons */}
      <div className="space-y-8">
        {/* Home Icon inside a blue circle */}
        <div className="bg-blue-700 rounded-full p-2">
          <FaHome className="text-white" size={24} />
        </div>
        {/* Dashboard/Grid Icon */}
        <MdDashboard className="text-blue-600 hover:text-blue-800 cursor-pointer" size={24} />
      </div>

      {/* Middle Section: User, Chart, and Toggle icons */}
      <div className="space-y-8">
        {/* User Icon */}
        <FaUser className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        {/* Chart/Stats Icon */}
        <FaChartBar className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        {/* Toggle Icon */}
        <IoToggle className="text-black hover:text-blue-600 cursor-pointer" size={24} />
      </div>

      {/* Bottom Section: Settings and Logout icons */}
      <div className="space-y-8 mt-auto">
        {/* Settings Icon */}
        <FaCog className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        {/* Logout Icon */}
        <FaSignOutAlt className="text-black hover:text-blue-600 cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
