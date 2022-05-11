import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import StartPage from "./components/StartPage";
import BadGate from "./components/BadGate"
import Layout from './layout/Layout';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
import SocketProvider from './Context/Socket.context';
function App() {
  return (
    <ErrorBoundary>
      <SocketProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="/lobby" element={<Lobby/>} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="*" element={<BadGate />} />
        </Route>
      </Routes>
      </SocketProvider>
    </ErrorBoundary>
  )
}

export default App;
