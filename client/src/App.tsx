import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";
import APIContextProvider from "./Context/Socket.context";
import StartPage from "./Components/StartPage";
import BadGate from "./Components/BadGate"

function App() {
  return (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<BadGate />} />
      </Routes>
    </ErrorBoundary>
</BrowserRouter>
  )
}

export default App;
