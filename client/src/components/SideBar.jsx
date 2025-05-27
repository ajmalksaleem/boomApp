import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserEdit, FaVideo, FaPlusCircle, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "@/redux/auth";

const SideBar = ({ showSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <aside
      className={`bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-4 md:block w-64 h-full transition-transform duration-300 md:translate-x-0 
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} absolute md:relative z-20 md:z-auto`}
    >
      <div className="text-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="User"
          className="w-20 h-20 rounded-full mx-auto mb-2"
        />
        <h2 className="font-bold text-lg">{user?.fullName || "Your Name"}</h2>
        <p className="text-sm">@{user?.username}</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <FaWallet className="w-4 h-4" />
          <span className="font-semibold">₹{user?.walletBalance ?? 0}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Your Profile</h3>
        <ul className="space-y-2 font-semibold flex flex-col">
          <Link className="flex items-center gap-2 hover:bg-red-700 hover:text-white dark:hover:bg-red-400 dark:hover:text-white px-3 py-2 rounded cursor-pointer">
            <FaUserEdit />
            Edit Profile
          </Link>
          <Link className="flex items-center gap-2 hover:bg-red-700 hover:text-white dark:hover:bg-red-400 dark:hover:text-white px-3 py-2 rounded cursor-pointer">
            <FaVideo />
            Your Videos
          </Link>
          <Link
            to="/add-videos"
            className="flex items-center gap-2 hover:bg-red-700 hover:text-white dark:hover:bg-red-400 dark:hover:text-white px-3 py-2 rounded cursor-pointer"
          >
            <FaPlusCircle />
            Add new video
          </Link>
          <Link className="flex items-center gap-2 hover:bg-red-700 hover:text-white dark:hover:bg-red-400 dark:hover:text-white px-3 py-2 rounded cursor-pointer">
            <FaVideo />
            Purchased Videos
          </Link>
          <Link onClick={()=>dispatchEvent(logoutUser)} className="flex items-center gap-2 hover:bg-red-700 hover:text-white dark:hover:bg-red-400 dark:hover:text-white px-3 py-2 rounded cursor-pointer">
            <FaSignOutAlt />
            Logout
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
