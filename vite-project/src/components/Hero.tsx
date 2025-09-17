import React from "react";
import user_group from "../assets/user_group.png";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 flex flex-col justify-center items-center text-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Create Masterpieces with AI
        </h1>
        <p className="text-lg text-gray-700">
          Unleash your imagination with our intelligent tools—write articles that
          resonate, craft visuals that inspire, and transform your ideas into
          unforgettable creations. The future of creativity starts here.
        </p>
      </div>

      <div className="flex gap-6 mt-10">
        <button onClick={() => navigate('/ai')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:scale-102 active:scale-95 transaction cursor-pointer">
            Start creating now➡️
        </button>
        <button className="bg-white text-gray-800 px-8 py-3 rounded-lg hover:scale-102 active:scale-95 transaction cursor-pointer">
          Watch demo➡️
        </button>
      </div>
      <div className="flex items-center gap-3 text-gray-600 mt-8">
        <img src={user_group} alt="" className="h-8 "/>Trusted by 10k+ people.
      </div>
    </div>
  );
};

export default Hero;
