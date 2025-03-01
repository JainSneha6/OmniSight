import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5002");

export default function WaitTimeAnalysis() {
  const navigate = useNavigate();
  const [queueSize, setQueueSize] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [gridData, setGridData] = useState(Array(10).fill(Array(20).fill(0)));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    socket.on("update_grid", (data) => {
      setQueueSize(data.queue_size);
      setWaitTime(data.wait_time);
      setGridData(data.grid);
      setHistory((prev) => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), waitTime: data.wait_time }]);
    });

    return () => {
      socket.off("update_grid");
    };
  }, []);

  const getColor = (value) => {
    return value < 0.3 ? "bg-green-500" : value < 0.6 ? "bg-yellow-500" : "bg-red-500";
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gradient-to-b from-[#2E0249] to-[#8D33A5] w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}role="Event Manager"/>
      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white rounded"></div>
      </div>

      <h1 className="text-5xl text-white font-extrabold mt-4 mb-6">Crowd Management</h1>

      <div className="text-white text-xl mb-4">Current Queue: {queueSize} people</div>
      <div className="text-white text-xl mb-8">Estimated Wait Time: {waitTime} min</div>

      <div className="grid grid-cols-10 md:grid-cols-20 gap-1 border p-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border-white/20 w-full max-w-5xl">
        {gridData.flat().map((value, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-6 h-6 md:w-8 md:h-8 border border-gray-400 rounded-lg shadow-lg ${getColor(value)}`}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl mt-8 bg-white/10 p-4 rounded-xl shadow-lg border-white/20">
        <h2 className="text-white text-2xl mb-4">Wait Time Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={history}>
            <XAxis dataKey="time" stroke="#fff"/>
            <YAxis stroke="#fff"/>
            <Tooltip contentStyle={{ backgroundColor: "transparent", color: "white", border: "none" }} cursor={{ fill: "transparent"}}/>
            <Bar dataKey="waitTime" fill="#ffcc00" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <motion.button
        onClick={() => navigate("/dynamic-queue-management")}
        className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Go to Dynamic Queue Management
      </motion.button>
    </div>
  );
}