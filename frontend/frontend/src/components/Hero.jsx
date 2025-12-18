import React from "react";
import { FaBus, FaCar, FaUsers } from 'react-icons/fa';
import bgVideo from '../assets/21985-323496013.mp4'; // ✅ Import the background video

import {Link} from 'react-router-dom'
export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center px-6 z-0">

      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover "
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

     
      <div className="absolute inset-0 bg-black bg-opacity-80 z-[-1]" />

     
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[20rem] bg-gradient-to-br from-[#d0e1df] via-white to-[#1a1a1a] opacity-20 blur-3xl rounded-3xl z-0" />

     
      <div className="z-10 flex flex-col items-center justify-center space-y-6 mt-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">
          Empowering Local Rides, Simplifying Transport
        </h1>
        <h2 className="text-5xl sm:text-6xl font-extrabold text-[#00fff7] drop-shadow-2xl">
          Connect. Ride. Grow.
        </h2>
        <p className="tracking-widest text-sm sm:text-base uppercase text-gray-300">
          For service providers & riders — all in one platform
        </p>


        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <Link to={"/operator"}>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-lime-400 text-black font-bold px-6 py-2 rounded-full shadow-xl hover:scale-105 hover:shadow-green-500/40 transition-all duration-300">
            <FaCar />
            <span>Register Your Fleet</span>
          </button>
          </Link>
           <Link to={"/user"}>
          <button className="flex items-center space-x-2 bg-white text-black font-bold px-6 py-2 rounded-full shadow-xl hover:bg-gray-200 transition-all duration-300">
            <FaUsers />
            <span>Find a Ride</span>
          </button>
          </Link>
        </div>
      

      
        <div className="absolute bottom-[0rem] animate-bounce text-sm text-cyan-500 font-extrabold flex flex-col items-center z-[10]">
          <div className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center ">
            ↓
          </div>
          <span className="mt-1">Scroll Down</span>
        </div>
      </div>
    </div>
  );
}
