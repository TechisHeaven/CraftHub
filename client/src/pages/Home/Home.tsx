import React from "react";
import { BsEmojiSmile } from "react-icons/bs";

const Home = () => {
  return (
    <div className="">
      <img
        src="bg-header.svg"
        className="left-0 object-cover absolute -z-10 -mt-10"
        alt="hero-image"
      />
      <div className="hero-section pt-48 flex gap-2 justify-items-center justify-between">
        <div className="flex flex-col items-start gap-4 max-w-[600px]">
          <h5 className="text-secondary text-xl font-semibold tracking-widest">
            --CraftHub
          </h5>
          <h1 className="text-6xl font-bold ">
            Choose Your Perfect Minecraft Server
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            quibusdam assumenda accusamus dolore. Magni, autem doloribus
            obcaecati quam eaque iure.
          </p>
          <div className="flex items-center border rounded-full p-2 px-4 gap-4 text-gray-400 border-gray-500">
            <BsEmojiSmile />
            <p>Start your adventure with us</p>
            <button className="p-2 border rounded-full px-6 text-white bg-primary hover:bg-primarySecondary transition-colors">
              Start
            </button>
          </div>
        </div>
        <div className="relative">
          <img src="/render-header.webp" className="z-10" alt="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
