import React, { useState } from 'react';
import axios from 'axios';
import {useEffect} from 'react'

const ChatPage=()=>{
    const[chat,setChat]=useState([]);

    // const fetchChats= async ()=>{
        // const {data}= await axios.get('/api/chats');
        // console.log(data);
        // setChat(data);
    // }
    // useEffect(()=>{
        // fetchChats();
    // },[])

    return(
        <>
            <p>Chat Page</p>
        </>
    )
}

export default ChatPage;