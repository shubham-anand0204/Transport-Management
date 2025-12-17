import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api";
import { Provider } from "react-redux";
import store from "./redux/store";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import ContactForm from "./pages/Contact";
import ServiceProviderForm from "./pages/ServiceProvideAuth";
import UserRegisterForm from "./pages/UserAuth";
import Onboarding from "./pages/Onboarding";
import OperatorDashboard from "./pages/OperatorDashboard";
import BookingForm from "./pages/UserBookingForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";

import TicketBookingPage from "./pages/TicketBooking"; // Add this import
import "./App.css";
// import ResultsPage from "./pages/Result";
import BusSeatSelectionPage from "./pages/BusSeatSelection";
import BusBooking from "./pages/BusBooking";
import VehicleBooking from "./pages/VehicleBooking";

// Separate component to handle route-based navbar logic
function AppRoutes() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/onboarding" ||
    location.pathname === "/operator" ||
    location.pathname === "/user" ||
    location.pathname === "/operator-dashboard" ||
    location.pathname === "/user-booking" ||
    location.pathname === "/personal_details" ||
    location.pathname === "/book"; // Add the booking route

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/user" element={<UserRegisterForm />} />
        <Route path="/operator-dashboard" element={<OperatorDashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/operator" element={<ServiceProviderForm />} />
        <Route path="/user-booking" element={<BookingForm />} />
        <Route path="/personal_details" element={<PersonalDetailsForm />} />
        <Route path="/bus-seats" element={<BusSeatSelectionPage />} />
        <Route path="/bus-results" element={<BusBooking />} />
         <Route path="/vehicle-results" element={<VehicleBooking />} />
        <Route path="/book" element={<TicketBookingPage />} />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <div className="font-sans">
      <Provider store={store}>
        <GoogleOAuthProvider clientId="683203259162-ppmbf6io7gvae0qpv21m7suduvvuokin.apps.googleusercontent.com">
          <LoadScript 
            googleMapsApiKey="AIzaSyC_QOHqCewQWCZakHfvDtN3Q9kOOCiqB9c"
            libraries={["places", "geometry"]}
            onLoad={() => {
              console.log('✅ Google Maps API loaded successfully');
              // Test if services are available
              if (window.google && window.google.maps) {
                console.log('✅ Google Maps services available');
                console.log('Places API:', window.google.maps.places ? '✅ Available' : '❌ Not available');
                console.log('Geocoding API:', window.google.maps.Geocoder ? '✅ Available' : '❌ Not available');
                console.log('Geometry API:', window.google.maps.geometry ? '✅ Available' : '❌ Not available');
              }
            }}
            onError={(error) => {
              console.error('❌ Google Maps API failed to load:', error);
              alert('Google Maps failed to load. Please check your internet connection and API key.');
            }}
          >
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </LoadScript>
        </GoogleOAuthProvider>
      </Provider>
    </div>
  );
}

export default App;