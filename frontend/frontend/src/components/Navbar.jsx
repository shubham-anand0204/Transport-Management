import React, { useState } from 'react';
import { FaBus } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { FaUser, FaUserTie } from 'react-icons/fa';
import { Link } from "react-router-dom"
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  return (
    <div className="flex justify-between items-center px-6 sm:px-12 py-4 absolute top-0 left-0 right-0 z-20">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <FaBus className="text-blue-500 text-xl" />
        </div>
        <span className="text-white font-bold text-xl">RideOn</span>
      </div>

      {/* Nav Links */}
      <div className="relative hidden md:flex space-x-8 font-medium">
        <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] blur-xl opacity-30 scale-150 -z-10"></div>
        {['HOME', 'SERVICES', 'ABOUT US', 'CONTACT'].map(link => (
          <a key={link} href={`/${link.toLowerCase().replace(' ', '')}`} className="text-white hover:text-yellow-300 transition-colors">
            {link}
          </a>
        ))}
      </div>


      {/* Auth Dropdowns */}
      <div className="hidden md:flex space-x-4 relative z-50">
        {/* SIGN UP */}
        <div className="relative group">
          <button
            onClick={() => setShowDropdown(showDropdown === 'signup' ? null : 'signup')}
            className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-yellow-300 hover:scale-105 transition-all duration-200"
          >
            SIGN UP
          </button>
          {showDropdown === 'signup' && (
            <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-white via-blue-50 to-white/70 backdrop-blur-lg border border-blue-200 text-black rounded-2xl shadow-2xl ring-1 ring-black/10 animate-fadeIn">
              <Link to="/user" state={{ mode: 'signup' }}>
                <button className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-blue-100 hover:text-blue-700 hover:shadow-inner hover:scale-[1.02] transition-all duration-150 rounded-t-2xl">
                  <FaUser /> Sign up as User
                </button>
              </Link>

              <Link to="/operator" state={{ mode: 'signup' }}>
                <button className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-blue-100 hover:text-blue-700 hover:shadow-inner hover:scale-[1.02] transition-all duration-150 rounded-b-2xl">
                  <FaUserTie /> Sign up as Service Provider
                </button>
              </Link>

            </div>
          )}
        </div>

        {/* LOG IN */}
        <div className="relative group">
          <button
            onClick={() => setShowDropdown(showDropdown === 'login' ? null : 'login')}
            className="border border-white text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-black hover:shadow-blue-300 hover:scale-105 transition-all duration-200"
          >
            LOG IN
          </button>
          {showDropdown === 'login' && (
            <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-white via-blue-50 to-white/70 backdrop-blur-lg border border-blue-200 text-black rounded-2xl shadow-2xl ring-1 ring-black/10 animate-fadeIn">
              <Link to="/user" state={{ mode: 'login' }}>
                <button className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-blue-100 hover:text-blue-700 hover:shadow-inner hover:scale-[1.02] transition-all duration-150 rounded-t-2xl">
                  <FaUser /> Log in as User
                </button>
              </Link>

              <Link to="/operator" state={{ mode: 'login' }}>
                <button className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-blue-100 hover:text-blue-700 hover:shadow-inner hover:scale-[1.02] transition-all duration-150 rounded-b-2xl">
                  <FaUserTie /> Log in as Service Provider
                </button>
              </Link>

            </div>
          )}
        </div>
      </div>




      {/* Hamburger */}
      <div className="md:hidden text-white text-3xl">
        <MdMenu />
      </div>
    </div>
  );
};

export default Navbar;
