import React from 'react'
import Room from "./createRoom"
import Chat from './Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
       <Route path="/" element={<Room />} />
       {/* <Route path="chat" element={<Chat  socket={socket} username={username} room={room} />}  /> */}
       </Routes>
    </BrowserRouter>
   
  )
}

export default App