import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";
import APIContextProvider from "./Context/Socket.context";
import StartPage from "./Components/StartPage";
import BadGate from "./Components/BadGate"
import Layout from './layout/Layout';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
function App() {
  return (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<BadGate />} />
          <Route path="/chatroom" element={<ChatRoom />} />

          <Route path="/lobby" element={<Lobby/>} />
      </Routes>
    </ErrorBoundary>
</BrowserRouter>
  )
}

export default App;
