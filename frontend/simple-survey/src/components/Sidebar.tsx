import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface SidebarProps {
  className?: string,
  children?: React.ReactNode,
  username?: string,
  email?: string,
  imgUrl?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  username,
  email,
  imgUrl
}) => {
  const navigate = useNavigate();
  return (
    <div className={`bg-primary text-body-text left-0 flex flex-row justify-center items-center h-screen w-64 ${className}`}>
      <div>
        {imgUrl}
        {username}
        {email}
      </div>

      <Button className="" onClick={() => navigate("/add-survey")}>
        + Add New Survey
      </Button>
    </div>
  );
}
  
export default Sidebar;