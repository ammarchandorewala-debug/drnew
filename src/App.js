import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Firstcodepage from "./Codeeditor/Firstcodepage/Firstcodepage";
import RunCodePage from "./Codeeditor/RunCodepage";
import StepRunnerPage from "./Codeeditor/StepRunnerPage";
import FlowchartPage from "./Codeeditor/FlowchartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Firstcodepage />} />
        <Route path="/run" element={<RunCodePage />} />
        <Route path="/step" element={<StepRunnerPage />} />
        <Route path="/flowchart" element={<FlowchartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;