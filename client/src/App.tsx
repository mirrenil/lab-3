import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Input from './components/Input';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Input />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
