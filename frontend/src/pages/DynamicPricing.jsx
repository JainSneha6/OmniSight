import { useState, useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./Sidebar";

const socket = io("http://localhost:5001"); 

export default function DynamicPricing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pricingData, setPricingData] = useState([
    { name: "Sandwich", actual: 50, suggested: 70 },
    { name: "Pizza", actual: 100, suggested: 135 },
    { name: "Donut", actual: 40, suggested: 80 },
    { name: "Cake", actual: 60, suggested: 100 },
    { name: "Hot dog", actual: 70, suggested: 90 },
  ]);

  useEffect(() => {
    socket.on("update_food_data", (data) => {
      const updatedPrices = data.updated_prices;

      setPricingData((prevData) =>
        prevData.map((item) => ({
          ...item,
          suggested: updatedPrices[item.name.toLowerCase()] || item.suggested,
        }))
      );
    });

    return () => {
      socket.off("update_food_data"); 
    };
  }, []);

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gradient-to-b from-[#2E0249] to-[#8D33A5] w-full text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} role="vendor" vendorType="Food Vendor" />

      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded transition-all duration-300 hover:scale-110"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded transition-all duration-300 hover:scale-110"></div>
        <div className="w-8 h-1 bg-white rounded transition-all duration-300 hover:scale-110"></div>
      </div>

      <h1 className="text-5xl font-extrabold mt-6 mb-10 tracking-wide drop-shadow-lg">
        Dynamic Pricing
      </h1>

      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 max-w-lg w-full">
        <div className="grid grid-cols-3 text-center text-xl font-bold pb-4 border-b border-white/20 text-white/80">
          <span className="text-left">Item</span>
          <span>Actual</span>
          <span className="text-right">Suggested</span>
        </div>

        {pricingData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 text-center py-3 border-b border-white/10 last:border-none text-lg transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] rounded-lg"
          >
            <span className="text-left font-medium">{item.name}</span>
            <span className="font-semibold">₹{item.actual}</span>
            <span className="font-bold text-yellow-300">₹{item.suggested.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
