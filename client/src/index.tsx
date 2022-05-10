import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SocketProvider from './Context/Socket.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <SocketProvider>
    <App />
    </SocketProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

