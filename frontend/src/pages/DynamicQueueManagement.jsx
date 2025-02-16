import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const socket = io("http://localhost:5000");

export default function DynamicQueueManagement() {
  const [activeQueues, setActiveQueues] = useState(1);
  const [suggestedQueues, setSuggestedQueues] = useState(1);
  const [activeQueueSizes, setActiveQueueSizes] = useState([1]); // Ensure at least 1 queue
  const [activeWaitTimes, setActiveWaitTimes] = useState([2]); // Default wait time
  const [suggestedQueueSizes, setSuggestedQueueSizes] = useState([1]);
  const [suggestedWaitTimes, setSuggestedWaitTimes] = useState([2]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    socket.on("update_grid", (data) => {
      setActiveQueues(data.active_queues || 1);
      setSuggestedQueues(data.suggested_queues || 1);
      setActiveQueueSizes(data.active_queue_sizes.length > 0 ? data.active_queue_sizes : [1]);
      setActiveWaitTimes(data.active_wait_times.length > 0 ? data.active_wait_times : [2]);
      setSuggestedQueueSizes(data.suggested_queue_sizes.length > 0 ? data.suggested_queue_sizes : [1]);
      setSuggestedWaitTimes(data.suggested_wait_times.length > 0 ? data.suggested_wait_times : [2]);
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
      <h1 className="text-5xl font-extrabold mt-4 mb-6">Dynamic Queue Management</h1>

      <h2 className="text-2xl font-semibold mb-4">Active Queues - {activeQueues}</h2>
      <QueueDisplay queues={activeQueueSizes} waitTimes={activeWaitTimes} color="blue" />

      <h2 className="text-2xl font-semibold mt-6 mb-4">Suggested Queues - {suggestedQueues}</h2>
      <QueueDisplay queues={suggestedQueueSizes} waitTimes={suggestedWaitTimes} color="yellow" />
    </div>
  );
}

function QueueDisplay({ queues = [], waitTimes = [], color }) {
  return (
    <div className="flex gap-8">
      {queues.map((size, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col-reverse w-16 h-50 bg-white/20 rounded-xl p-2">
            {[...Array(Math.max(size, 1))].map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded-full mt-2 ${
                  color === "blue" ? "bg-blue-800" : "bg-yellow-400"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-lg font-semibold">{waitTimes[index] ?? 2} mins</p>
        </motion.div>
      ))}
    </div>
  );
}
