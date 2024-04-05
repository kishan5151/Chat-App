import React, { useState } from 'react';
import { ChatState } from './componant/ChatContext/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from './componant/miscellaneous/SideDrawer';
import MyChats from './componant/MyChats';
import ChatBox from './ChatBox';


const ChatPage=()=>{
    const {user}=ChatState()
    const [fetchAgain,setFetchAgain]=useState();

    return(
        <>
            <div style={{width:"100%"}}>
                {user && <SideDrawer/>}
                <Box 
                    display='flex'
                    justifyContent='space-between'
                    w='100%'
                    h='91.5h'
                    p='10px'    
                >
                    {user && <MyChats fetchAgain={fetchAgain} />}
                    {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
                </Box>
            </div>  
        </>
    )
}

export default ChatPage;