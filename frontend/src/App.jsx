import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CrowdGrid from "./pages/CrowdConcentration";
import ResourceAllocation from "./pages/ResourceAllocation";
import WaitTimeAnalysis from "./pages/WaitTimeAnalysis";
import QueueVisualization from "./pages/DynamicQueueManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crowd-management" element={<CrowdGrid/>} />
        <Route path="/resource-allocation" element={<ResourceAllocation/>}/>
        <Route path="/wait-time-analysis" element={<WaitTimeAnalysis/>} />
        <Route path="/dynamic-queue-management" element={<QueueVisualization/>} />
      </Routes>
    </Router>
  );
};

export default App;