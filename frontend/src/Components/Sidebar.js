import { FaHome, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdWidgets } from "react-icons/md"; 
import { IoToggle } from "react-icons/io5";
import Logo from "../Assets/logo_web.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-16 bg-white flex flex-col items-center py-4 space-y-8 shadow-lg">
      
      <div className="space-y-8">

      <div className="j">
          <img src={Logo} className="k" alt="logo" />
        </div>

        <MdDashboard className="text-blue-600 hover:text-blue-800 cursor-pointer" size={24} />
      </div>

  
      <div className="space-y-8">
  
        <FaUser className="text-black hover:text-blue-600 cursor-pointer" size={24} />

        <FaChartBar className="text-black hover:text-blue-600 cursor-pointer" size={24} />

        <IoToggle className="text-black hover:text-blue-600 cursor-pointer" size={24} />
      </div>

      <div className="space-y-8 mt-auto">

        <FaCog className="text-black hover:text-blue-600 cursor-pointer" size={24} />

        <FaSignOutAlt className="text-black hover:text-blue-600 cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
