import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CrowdGrid from "./pages/CrowdConcentration";
import ResourceAllocation from "./pages/ResourceAllocation";
import WaitTimeAnalysis from "./pages/WaitTimeAnalysis";
import QueueVisualization from "./pages/DynamicQueueManagement";
import DynamicPricing from "./pages/DynamicPricing";
import TargetedMarketing from "./pages/TargetedMarketing";

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
        <Route path="/dynamic-pricing" element={<DynamicPricing/>} />
        <Route path="/targeted-marketing" element={<TargetedMarketing/>} />
        <Route path="/targeted-marketing" element={<TargetedMarketing/>} />
      </Routes>
    </Router>
  );
};

export default App;