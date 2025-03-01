import { motion } from "framer-motion";

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

export default QueueDisplay;