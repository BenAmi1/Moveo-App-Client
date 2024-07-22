import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LobbyPage from "./LobbyPage";
import CodeBlockPage from "./CodeBlockPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/code-block/:id" element={<CodeBlockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
