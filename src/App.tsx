import React from 'react';
import './App.css';
import MasterChef from './MasterChef';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="MasterChef" />} />
          <Route path="/MasterChef/*" element={<MasterChef />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
