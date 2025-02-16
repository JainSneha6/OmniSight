import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Sidebar from "./Sidebar";

const GRID_ROWS = 10;
const GRID_COLS = 20;
const socket = io("http://127.0.0.1:5000");

const CrowdGrid = () => {
  const [gridData, setGridData] = useState(
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0))
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    socket.on("update_grid", (data) => {
      setGridData(data.grid);
    });

    return () => {
      socket.off("update_grid");
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gradient-to-b from-[#2E0249] to-[#8D33A5] w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} role="Event Manager"/>

      {/* Hamburger Menu */}
      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white rounded"></div>
      </div>

      <h1 className="text-5xl text-white font-extrabold mt-4 mb-6">Crowd Management</h1>
      <div className="grid grid-cols-10 md:grid-cols-20 gap-1 border mt-[100px] p-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg border-white/20 w-full max-w-5xl">
        {gridData.flat().map((value, index) => {
          let color = value < 0.3 ? "bg-green-500" : value < 0.6 ? "bg-yellow-500" : "bg-red-500";
          return <div key={index} className={`w-6 h-6 md:w-8 md:h-8 ${color} border border-gray-400 rounded-lg shadow-lg`}></div>;
        })}
      </div>
    </div>
  );
};

export default CrowdGrid;
