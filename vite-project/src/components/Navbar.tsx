

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md z-50">
      <img
        src={logo}
        alt="logo"
        className="w-32 h-14 -mt-4 -mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {user ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Get started ➡️
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default Navbar;
