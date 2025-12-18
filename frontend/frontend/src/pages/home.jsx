import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ServicePreview from '../components/ServicePreview'; // 🔹 Import the new component
import FAQ from '../components/faqData';
import Footer from '../components/Footer';




const Home = () => {
  return (
    <div className="relative bg-amber-500 min-h-screen w-full overflow-hidden">
    
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Layer 1 */}
        <div className="absolute inset-0 rounded-br-[3rem] bg-gradient-to-br from-[#1a1a1a] via-[#9ec5c5] to-[#1a1a1a] opacity-60 blur-2xl mix-blend-lighten z-0" />

        {/* Background Layer 2 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#9ec5c5]/20 via-black/80 to-black z-[-1]" />

        {/* Hero Section */}
        <Hero />
      </div>

    
      {/* Services Preview Section */}
      <div className="relative z-10 bg-white">
        <ServicePreview />
      </div>
       <div className="relative z-10 bg-white">
        <FAQ/>
      </div>
       <div className="relative z-10 bg-white">
        <Footer/>
      </div>

    </div>
  );
};

export default Home;
