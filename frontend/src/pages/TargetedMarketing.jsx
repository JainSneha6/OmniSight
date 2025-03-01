import { useState, useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./Sidebar";

const socket = io("http://localhost:5001");

export default function TargetedMarketing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [marketingMessages, setMarketingMessages] = useState([]);

  useEffect(() => {
    socket.on("update_marketing_data", (data) => {
      setMarketingMessages(data.marketing_messages || []);
    });

    return () => {
      socket.off("update_marketing_data");
    };
  }, []);

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gradient-to-b from-[#2E0249] to-[#8D33A5] w-full text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} role="vendor" vendorType="Food Vendor" />

      {/* Sidebar Toggle Button */}
      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded transition-all duration-300 hover:scale-110"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded transition-all duration-300 hover:scale-110"></div>
        <div className="w-8 h-1 bg-white rounded transition-all duration-300 hover:scale-110"></div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mt-6 mb-10 tracking-wide drop-shadow-lg">
        Targeted Marketing
      </h1>

      {/* Marketing Messages Section */}
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 max-w-lg w-full">
        <h2 className="text-center text-2xl font-semibold mb-4 text-white">
          🔥 Hot Deals & Promotions
        </h2>

        {marketingMessages.length === 0 ? (
          <p className="text-center text-lg text-white/80">No promotions at the moment.</p>
        ) : (
          marketingMessages.map((message, index) => (
            <div
              key={index}
              className="bg-black/20 p-4 my-2 rounded-lg text-center text-lg transition-all duration-300 hover:bg-black/30 hover:scale-105"
            >
              {message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
