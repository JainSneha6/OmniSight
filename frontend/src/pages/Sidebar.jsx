import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, role, vendorType }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#2E0249] text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      {/* Close Button */}
      <button className="absolute top-4 right-4 p-2" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="hover:opacity-80 transition"
        >
          <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className="p-6 mt-10">
        <h2 className="text-2xl text-center font-bold mb-2">
          {role === "vendor" ? "Vendor" : "Event Manager"}
        </h2>

        {/* Show Vendor Type if Role is Vendor */}
        {role === "vendor" && (
          <p className="text-center text-white/80 text-lg mb-4">{vendorType}</p>
        )}

        <ul className="space-y-2">
          {role === "vendor" ? (
            <>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/targeted-marketing">Targeted Marketing</Link>
              </li>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/dynamic-pricing">Dynamic Pricing</Link>
              </li>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/resource-allocation">Resource Allocation</Link>
              </li>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/wait-time-analysis">Wait Time Analysis</Link>
              </li>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/dynamic-queue-management">Dynamic Queue Management</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:bg-white hover:text-black text-center p-2 rounded">
                <Link to="/crowd-management">Crowd Management</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;