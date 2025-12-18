import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import gsap from "gsap";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 23.5937, // Central India
  lng: 80.9629,
};

const cities = [
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
];

const GoogleMapWithMarkers = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="px-4 py-12 bg-gradient-to-br from-blue-50 to-white shadow-xl">
      <h2
        ref={headingRef}
        className="text-5xl font-extrabold text-center text-gray-800 mb-8 tracking-tight"
      >
        <span className="text-blue-600">🌍 Our</span>{" "}
        <span className="text-purple-700">Serviceable Areas</span>
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
        We’re currently offering services in major metropolitan cities across
        India. More cities coming soon!
      </p>

      <div className="overflow-hidden border border-gray-200 shadow-lg">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {cities.map((city, index) => (
            <Marker
              key={index}
              position={{ lat: city.lat, lng: city.lng }}
              title={city.name}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapWithMarkers;
