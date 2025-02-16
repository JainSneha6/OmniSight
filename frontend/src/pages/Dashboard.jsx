import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Extract role and vendorType from location state (defaults applied)
  const role = location.state?.role || "vendor";
  const vendorType = location.state?.vendorType || "General Vendor"; 

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2E0249] to-[#8D33A5] p-6">
      {/* Sidebar (Shows based on role) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        role={role} 
        vendorType={vendorType} 
      />

      {/* Hamburger Menu */}
      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white rounded"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Image Section (Left) */}
        <div className="w-full md:w-3/4 flex justify-start">
          <img src="/image.png" alt="Dashboard" className="w-[690px] object-contain" />
        </div>

        {/* OmniSight Heading (Right) */}
        <div className="w-full md:w-1/4 flex flex-col items-end">
          <h1 className="text-8xl font-bold text-white text-right">OmniSight</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
