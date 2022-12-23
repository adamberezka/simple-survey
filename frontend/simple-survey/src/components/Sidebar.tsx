import React from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <div className={`bg-primary text-body-text left-0 top-0 flex flex-col gap-y-16 justify-center items-center h-screen w-64 fixed ${className}`}>
      <div className="flex flex-col justify-center items-center gap-y-2">
        <img src={imgUrl} className="rounded-full" alt="google use avatar"/>
        <div>
          {username}
        </div>
        <div>
          {email}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <Button className="bg-secondary px-4 py-1" onClick={() => navigate("/surveys")}>
          My Surveys
        </Button>
        <Button className="bg-secondary px-4 py-1" onClick={() => navigate("/add-survey")}>
          + Add New Survey
        </Button>
        {isAdmin &&
        <Button className="bg-secondary px-4 py-1" onClick={() => navigate("/logs")}>
          Browse Logs
        </Button>}
      </div>
    </div>
  );
}
  
export default Sidebar;