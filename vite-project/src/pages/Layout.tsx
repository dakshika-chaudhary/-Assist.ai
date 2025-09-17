import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {  X } from "lucide-react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar.tsx";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user } = useUser();
  

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-2 ">
        <img src={logo} alt="Logo"  className=" w-34 h-auto cursor-pointer" onClick={() => navigate("/")} />
        {
           sidebarOpen ?
           <X onClick={() => setSidebarOpen(false)} className="w-6 h-6 text-gray-600 sm:hidden" />
           :
          //  icon for menu opening
           <Menu onClick={() => setSidebarOpen(true)} className="w-6 h-6 text-gray-600 sm:hidden" />
        }
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-4rem)] bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Outlet />
      </div>
     
    
    </div>
  ):(
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;

