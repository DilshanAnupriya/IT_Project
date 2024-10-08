import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { IoToggle } from "react-icons/io5";
import Logo from "../../Assets/logo_suwini.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-16 mt-10 bg-white fixed top-0 left-0 flex flex-col items-center py-10 space-y-6 shadow-lg z-50">
      
      {/* Logo Section */}
      <div className="mb-12">
        <img src={Logo} className="w-12" alt="logo" />
      </div>

      {/* Menu Icons */}
      <div className="flex flex-col space-y-12">
        <Link to="/admin-review">
          <FaUser className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        </Link>

        <Link to="/report">
          <FaChartBar className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        </Link>

        <Link to="/admin-complaint">
          <IoToggle className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        </Link>
      </div>

      {/* Footer Icons (Bottom) */}
      <div className="flex flex-col space-y-8 mt-auto mb-10">
        <Link to="/complaints">
          <FaCog className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        </Link>

        <Link to="/client-review">
          <FaSignOutAlt className="text-black hover:text-blue-600 cursor-pointer" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
