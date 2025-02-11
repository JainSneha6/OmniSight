import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [role, setRole] = useState("vendor");
  const [vendorType, setVendorType] = useState(""); // To store vendor type
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let assignedVendorType = "";
    if (role === "vendor") {
      if (email.includes("food")) {
        assignedVendorType = "Food Vendor";
      } else if (email.includes("cloth")) {
        assignedVendorType = "Clothes Vendor";
      } else {
        assignedVendorType = "General Vendor"; // Default for non-matching vendors
      }
    }

    setVendorType(assignedVendorType);
    console.log(`Logging in as ${role}:`, { email, password, assignedVendorType });

    navigate("/dashboard", { state: { role, vendorType: assignedVendorType } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#643470] to-[#BF63D6] p-6">
      {/* OmniSight Heading */}
      <h1 className="text-5xl font-bold text-white text-center mb-10">OmniSight</h1>

      {/* Main Content - Login Form (Left) + Image (Right) */}
      <div className="flex flex-row bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 w-full max-w-5xl">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

          {/* Role Toggle */}
          <div className="flex items-center justify-between bg-white/20 rounded-full p-1 mb-6 relative">
            <span
              className={`w-1/2 text-center py-2 text-lg font-medium cursor-pointer transition ${
                role === "vendor" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setRole("vendor")}
            >
              Vendor
            </span>
            <span
              className={`w-1/2 text-center py-2 text-lg font-medium cursor-pointer transition ${
                role === "event_manager" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setRole("event_manager")}
            >
              Event Manager
            </span>
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-white/30 rounded-full transition-all duration-300 ${
                role === "event_manager" ? "translate-x-full" : ""
              }`}
            ></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white font-medium text-lg">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 bg-white/20 text-white rounded-lg placeholder-white/70 focus:ring-2 focus:ring-purple-300 outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium text-lg">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 bg-white/20 text-white rounded-lg placeholder-white/70 focus:ring-2 focus:ring-purple-300 outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white/20 text-white py-3 rounded-lg text-lg font-semibold hover:bg-white/30 transition shadow-lg hover:shadow-white/50"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img
            src="image.png"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
