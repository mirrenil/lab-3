import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import StartPage from "./components/StartPage";
import BadGate from "./components/BadGate"
import Layout from './layout/Layout';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
function App() {
  return (
  
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="/lobby" element={<Lobby/>} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="*" element={<BadGate />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App;
