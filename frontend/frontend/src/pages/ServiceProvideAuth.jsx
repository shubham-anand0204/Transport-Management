import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import {
  setPhone,
  setOtpValue,
  resetOtp,
  sendOtp,
  verifyOtp,
  startResendCooldown,
  decrementResendCooldown,
  resetAuthState,
  setRole,
} from "../redux/slices/authSlice";

export default function ServiceProvideAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const leftContentRef = useRef(null);
  const formRef = useRef(null);
  const otpRefs = useRef([]);

  const mode = location.state?.mode || "signup";
  const role = location.pathname.split("/")[1]; // get role from URL

  const dispatch = useDispatch();
  const {
    phone,
    otp,
    isOtpSent,
    isOtpVerified,
    resendCooldown,
    resendActive,
    loading,
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setRole(role));
    gsap.fromTo(leftContentRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.4 });
    gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.4, delay: 0.4 });
  }, []);

  useEffect(() => {
    let timer;
    if (resendActive && resendCooldown > 0) {
      timer = setTimeout(() => dispatch(decrementResendCooldown()), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, resendActive]);

  const handleGenerateOtp = () => {
    if (phone.length === 10) {
      dispatch(resetOtp());
      dispatch(sendOtp({ phone, role }));
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
      dispatch(startResendCooldown());
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;
    dispatch(setOtpValue({ index, value }));
    if (index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      const result = await dispatch(verifyOtp({ phone, otp: fullOtp, role }));
      if (verifyOtp.fulfilled.match(result)) {
        navigate("/onboarding");
      } else {
        alert("Incorrect OTP. Please try again.");
      }
    } else {
      alert("Please enter all 4 digits of the OTP.");
    }
  };

  const handleResendOtp = () => {
    dispatch(resetOtp());
    otpRefs.current[0]?.focus();
    dispatch(sendOtp({ phone, role }));
    dispatch(startResendCooldown());
  };

  const handleReEnterNumber = () => {
    dispatch(resetAuthState());
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("googleUser", JSON.stringify(decoded));
    navigate("/onboarding");
  };

  return (
    <div className="w-full h-[100vh]">
      <div className="bg-white h-full shadow-2xl w-full grid md:grid-cols-2">
        {/* Left Section */}
        <div ref={leftContentRef} className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 leading-snug">
            Reach Thousands
            <br />
            of Riders Daily — <br />
            <span className="text-orange-600">List Now!</span>
          </h2>
          <p className="text-sm text-gray-600">
            Grow your transportation business with{" "}
            <span className="font-semibold">RoadOn</span>, the most reliable
            transporting platform, and access millions of customers.
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-orange-600 text-center flex items-center justify-center py-12 px-8">
          <div
            ref={formRef}
            className="bg-white rounded-xl p-8 w-full max-w-xl h-[75vh] flex flex-col justify-between shadow-xl"
          >
            <div>
              <p className="text-sm text-orange-600 font-medium mb-2">
                {mode === "login" ? "LOG IN" : "SIGN UP"}
              </p>
              <h3 className="text-xl font-semibold text-black mb-6">
                {mode === "login"
                  ? "Welcome Back Partner!"
                  : "Welcome Partner — Let’s Drive Success Together!"}
              </h3>

              {!isOtpSent ? (
                <>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden mb-4">
                    <span className="px-4 py-2 bg-gray-100 text-sm text-gray-600">+91 IN</span>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => dispatch(setPhone(e.target.value))}
                      className="w-full px-4 py-2 outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={handleGenerateOtp}
                    disabled={loading}
                    className="w-full hover:bg-gray-400 border text-black text-sm py-2 px-4 rounded-md transition shadow-md"
                  >
                    {loading ? "Sending OTP..." : "GENERATE OTP"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-700 mb-2">
                    Enter the OTP sent to <strong>+91-{phone}</strong>
                  </p>
                  <div className="flex justify-between gap-3 mb-4">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-12 h-12 text-center border rounded-md text-xl"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full bg-orange-500 text-white text-sm py-2 px-4 rounded-md hover:bg-orange-600 transition"
                    >
                      {loading ? "Verifying..." : "VERIFY OTP"}
                    </button>
                    <button
                      onClick={handleResendOtp}
                      disabled={resendActive}
                      className={`w-full text-sm py-2 px-4 rounded-md border shadow-md ${
                        resendActive
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                    >
                      {resendActive
                        ? `Resend in ${resendCooldown}s`
                        : "RESEND OTP"}
                    </button>
                    <button
                      onClick={handleReEnterNumber}
                      className="text-sm text-blue-600 underline mt-1"
                    >
                      Re-enter Phone Number
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-6 relative flex items-center justify-center">
              <div className="absolute w-full border-t border-gray-300"></div>
              <span className="bg-white px-4 text-sm text-gray-500 z-10">
                or continue with
              </span>
            </div>

            {/* Google Login */}
            <div className="flex flex-col gap-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google login failed")}
              />
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 border py-2 rounded-md text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                <img
                  src="https://img.icons8.com/ios-filled/16/cccccc/facebook-new.png"
                  alt="Facebook"
                />
                Facebook login unavailable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
