import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const GRID_ROWS = 10;
const GRID_COLS = 20;
const socket = io("http://localhost:5000");

export default function ResourceAllocation() {
  const [gridData, setGridData] = useState(Array(GRID_ROWS).fill(Array(GRID_COLS).fill(0)));
  const [queueSize, setQueueSize] = useState(0);
  const [requiredStaff, setRequiredStaff] = useState(1);
  const [cashiers, setCashiers] = useState(1);
  const [cooks, setCooks] = useState(1);
  const [servers, setServers] = useState(1);
  const [queueHistory, setQueueHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    socket.on("update_grid", (data) => {
      setGridData(data.grid);
      setQueueSize(data.queue_size);
      setRequiredStaff(data.required_staff);
      setCashiers(data.cashiers);
      setCooks(data.cooks);
      setServers(data.servers);
      setQueueHistory((prev) => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), size: data.queue_size }]);
    });
    return () => {
      socket.off("update_grid");
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#2E0249] to-[#8D33A5] text-white p-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}role="vendor" vendorType="Food Vendor"/>

        {/* Hamburger Menu */}
        <div className="absolute top-6 left-6 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white mb-1 rounded"></div>
        <div className="w-8 h-1 bg-white rounded"></div>
        </div>

      <h1 className="text-5xl font-extrabold mt-4 mb-6">Resource Allocation</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-6">
        <StatCard title="Queue Size" value={queueSize} />
        <StatCard title="Required Staff" value={requiredStaff} />
        <StatCard title="Cashiers" value={cashiers} />
        <StatCard title="Cooks & Servers" value={`${cooks} / ${servers}`} />
      </div>
      
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
      
      <div className="w-full max-w-5xl mt-6 p-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg border-white/20">
        <h2 className="text-xl font-bold text-center mb-2">Queue Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={queueHistory}>
            <XAxis dataKey="time" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip contentStyle={{ backgroundColor: "#643470", color: "white" }} />
            <Line type="monotone" dataKey="size" stroke="#FF6B6B" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const getColor = (value) => {
  return value < 0.3 ? "bg-green-500" : value < 0.6 ? "bg-yellow-500" : "bg-red-500";
};

const StatCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
