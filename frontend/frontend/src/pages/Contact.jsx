import React from "react";
import bg from "../assets/WhatsApp Image 2025-06-17 at 23.08.02_93048246.jpg";

export default function ContactForm() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
      className="relative py-20 px-6 md:px-20 min-h-screen flex items-center justify-center"
    >
    

      <div className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-md p-8 md:p-12 mt-7 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
          Get in Touch
        </h2>
        <p className="text-gray-200 text-center mb-8 drop-shadow">
          Have questions or want to partner with us? Fill out the form below and we’ll get back to you shortly.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
