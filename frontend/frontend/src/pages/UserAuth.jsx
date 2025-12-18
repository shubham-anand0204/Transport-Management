import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  setPhone,
  setOtpValue,
  resetOtp,
  resetAuthState,
  startResendCooldown,
  decrementResendCooldown,
  sendOtp,
  verifyOtp,
  setRole,
} from "../redux/slices/authSlice";

export default function UserAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const leftContentRef = useRef(null);
  const formRef = useRef(null);
  const otpRefs = useRef([]);
  const mode = location.state?.mode || "signup";

  const {
    phone,
    otp,
    isOtpSent,
    resendCooldown,
    resendActive,
    loading,
    isOtpVerified,
  } = useSelector((state) => state.auth);

  const role = location.pathname.split("/")[1]; // e.g., "user"

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

  useEffect(() => {
    if (isOtpVerified) {
      navigate("/user-booking");
    }
  }, [isOtpVerified]);

  const handleOtpInput = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;
    dispatch(setOtpValue({ index, value }));
    if (index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleGenerateOtp = () => {
    if (/^\d{10}$/.test(phone)) {
      dispatch(resetOtp());
      dispatch(sendOtp({ phone, role }));
      setTimeout(() => otpRefs.current[0]?.focus(), 200);
      dispatch(startResendCooldown());
    } else {
      alert("Enter a valid 10-digit phone number");
    }
  };

  const handleResendOtp = () => {
    dispatch(resetOtp());
    otpRefs.current[0]?.focus();
    dispatch(sendOtp({ phone, role }));
    dispatch(startResendCooldown());
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      const result = await dispatch(verifyOtp({ phone, otp: fullOtp, role }));
      if (!verifyOtp.fulfilled.match(result)) {
        alert("Incorrect OTP. Try again.");
      }
    } else {
      alert("Enter all 4 digits of the OTP.");
    }
  };

  const handleReEnter = () => dispatch(resetAuthState());

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("googleUser", JSON.stringify(decoded));
    navigate("/user-booking");
  };

  return (
    <div className="w-full h-[100vh]">
      <div className="bg-white h-full shadow-2xl w-full grid md:grid-cols-2">
        {/* Left */}
        <div ref={leftContentRef} className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-6">
            Book Rides <br />
            Faster and Safer — <br />
            <span className="text-orange-600">Join RoadOn Now!</span>
          </h2>
          <p className="text-sm text-gray-600">
            Seamless travel with <strong>RoadOn</strong>. Instant booking, tracking, and safety.
          </p>
        </div>

        {/* Right */}
        <div className="bg-orange-600 flex items-center justify-center px-8 py-12">
          <div
            ref={formRef}
            className="bg-white rounded-xl p-8 w-full max-w-xl h-[75vh] flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-orange-600 font-medium mb-2">{mode.toUpperCase()}</p>
              <h3 className="text-xl font-semibold mb-6">
                {mode === "login"
                  ? "Welcome Back — Login to Ride!"
                  : "Join RoadOn — Sign Up to Ride!"}
              </h3>

              {!isOtpSent ? (
                <>
                  <div className="flex border rounded-md overflow-hidden mb-4">
                    <span className="px-4 py-2 bg-gray-100 text-sm text-gray-600">+91 IN</span>
                    <input
                      type="tel"
                      value={phone}
                      placeholder="Enter your mobile number"
                      onChange={(e) => dispatch(setPhone(e.target.value))}
                      className="w-full px-4 py-2 outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={handleGenerateOtp}
                    disabled={loading}
                    className="w-full border text-black text-sm py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition"
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
                        onChange={(e) => handleOtpInput(e, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-12 h-12 text-center border rounded-md text-xl"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-orange-500 text-white text-sm py-2 px-4 rounded-md hover:bg-orange-600 transition"
                    >
                      VERIFY OTP
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
                      onClick={handleReEnter}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
