import React from "react";
import { Button, ButtonGroup, ChakraProvider } from '@chakra-ui/react'
import {Route, Routes} from 'react-router-dom';
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from "./ChatPage"
import "./App.css"

const App=()=>{
  return(
    <>
    <ChakraProvider>
    <div className="app">
      <Routes className="app">
        <Route path="/" element={<Home/>}/>
        <Route path="/chats" element={<ChatPage/>}/>
      </Routes>
      </div>
      </ChakraProvider>
    </>
  )
}

export default App;