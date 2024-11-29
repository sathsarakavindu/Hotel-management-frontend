import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


export default function OTPVerificationPage() {
    const location = useLocation();
    const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const email = location.state?.email || "";

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Ensure input is only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only accept one digit per input
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 4);
    const newOtp = pasteData.split("").map((char, index) => (index < 4 ? char : ""));
    setOtp(newOtp);
    for (let i = 0; i < newOtp.length; i++) {
      document.getElementById(`otp-input-${i}`).value = newOtp[i] || "";
    }
  };

  const handleSubmit = () => {
    //alert(`Entered OTP: ${otp.join("")}`);

    const otpValue = otp.join("");

    const otpCode = { 
        "otp": otpValue,
        "email": email
    };

    console.log(otp);

   axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/verify-email',otpCode).
   then((result)=>{
     if(result.data.message){
      toast.success(`${result.data.message}`);
       
      navigate('/login');
     }
     else{
      toast.err(`${result.data.error}`);
       
      return;
     }

   }).catch((err)=>{
    console.log(err);
    toast.error("OTP is invalid.");
   });



  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Verify Your OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter the 4-digit code sent to your mobile number.
        </p>
        <div className="flex justify-between items-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-100 text-gray-800"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
        >
          Verify OTP
        </button>
        <p className="text-sm text-center text-gray-600 mt-6">
          Didn't receive a code?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
