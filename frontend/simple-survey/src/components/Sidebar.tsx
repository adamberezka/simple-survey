import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../redux/User/user.actions";
import Button from "./Button";

interface SidebarProps {
  className?: string,
  children?: React.ReactNode,
  username?: string,
  email?: string,
  imgUrl?: string,
  isAdmin?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  username,
  email,
  imgUrl,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    localStorage.removeItem('userData');
      dispatch(unsetUser());
      navigate('/login');
  }

  return (
    <div className={`bg-white shadow-xl left-0 top-0 flex flex-col gap-y-16 justify-center items-center h-screen w-64 fixed pt-32 pb-16 ${className}`}>
      <div className="flex flex-col justify-center items-center gap-y-1">
        <img src={imgUrl} className="rounded-full" alt="google use avatar"/>
        <div className="font-semibold">
          {username}
        </div>
        <div className="text-light-gray opacity-60">
          {email}
        </div>
      </div>
      <div className="h-full flex flex-col justify-between gap-y-4 text-white">
        <div className="flex flex-col gap-y-4">
          <Button className="bg-primary px-4 py-1" onClick={() => navigate("/surveys")}>
            My Surveys
          </Button>
          <Button className="bg-primary px-4 py-1" onClick={() => navigate("/add-survey")}>
            + Add New Survey
          </Button>
          {isAdmin &&
          <Button className="bg-primary px-4 py-1" onClick={() => navigate("/logs")}>
            Browse Logs
          </Button>}
        </div>
        <Button className="bg-white text-[#000] px-4 py-1" onClick={() => logoutUser()}>
          Log out
        </Button>
      </div>
    </div>
  );
}
  
export default Sidebar;