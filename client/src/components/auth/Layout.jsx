import { Navigate, Outlet } from "react-router-dom";
import AuthGraphic from "../../assets/AuthGraphic.svg";
import { IoVideocamOutline } from "react-icons/io5";
import {
  MdOutlineAttachMoney,
  MdOutlineCardGiftcard,
  MdOutlineSlowMotionVideo,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Layout = () => {
  const{user} = useSelector(state => state.auth)
   if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex w-full ">
      <div className="hidden lg:flex flex-col items-center justify-center w-[40] bg-red-500  px-12 ">
        <div className="max-w-md  text-center mt-3 ">
          <span className="font-mono text-xl text-white">
            Welcome to........
          </span>
          <h1 className="text-5xl font-extrabold mt-5 tracking-tight text-white">
            B O O M
          </h1>
          <span className="text-sm mb-2 text-white">
            Where creators rise by talent
          </span>
          <div className="flex justify-center">
            <img src={AuthGraphic} alt="" className="size-96" />
          </div>
        </div>
        <div className="mt-2 flex gap-10  ">
          <IoVideocamOutline size={20} />
          <MdOutlineSlowMotionVideo size={20} />
          <MdOutlineAttachMoney size={20} />
          <MdOutlineCardGiftcard size={20} />
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center ">
        <div className="md:hidden pt-6 ">
          <span className="font-mono text-sm">Welcome to........</span>
          <h1 className="text-4xl font-extrabold tracking-tight ">aDDress..</h1>
        </div>

        <div className=" px-8 py-6 sm:px-5 lg:px-8 flex-col flex  w-full ">
          <div className=" md:hidden flex flex-col w-[85%]  size-60 ml-2 ">
            <img src={AuthGraphic} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
