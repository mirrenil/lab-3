import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatRoom from './components/ChatRoom';


//import ChatRoom from './components/ChatRoom';
import Input from './components/Input';
import Lobby from './components/Lobby';
import NewRoom from './components/NewRoom';
import SideBar from './components/SideBar';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
    {/* Add socketprovider here */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Input />} />

          <Route path="/chatroom" element={<ChatRoom />} />

          <Route path="/lobby" element={<Lobby/>} />
          {/* <Route path="/chat" element={<ChatRoom/>} /> */}

        </Route>
      </Routes>
       {/* Add socketprovider here */}
    </BrowserRouter>
  );
}

export default App;
