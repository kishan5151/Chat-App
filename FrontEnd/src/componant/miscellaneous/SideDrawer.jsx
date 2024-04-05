import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../ChatContext/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListeItem";
import { getSender } from "../../config/ChatLogic";
import NotificationBadge, { Effect } from "react-notification-badge"

const SideDrawer=()=>{
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast=useToast();
     const {setSelectedChat,user,notification,setNotification,chats,setChats,} = ChatState();
    // console.log(user);

    console.log(notification);
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    };

    const handleSearch = async () => {
        if (!search) {
          toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
        }
        
        try {
            setLoading(true);

            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data}=await axios.get(`http://localhost:5000/api/users?search=${search}`,config)
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                discription:"Failed to Load The Search Result",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
              return;   
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
          setLoadingChat(true);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(`/api/chat`, { userId }, config);

          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setLoadingChat(false);
          onClose();
        } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
  };


    return(
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text display={{ base: "none", md: "flex" }} px={4} pt={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans">
                    RK HOLA
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                              count={notification.length}
                              effect={Effect.SCALE}
                              />
                            <BellIcon fontSize="2xl" m={1}></BellIcon>
                        </MenuButton>
                        <MenuList pl={2}>
                          {!notification.length && "No New Messages"}
                          {notification.map((notif) => (
                            <MenuItem
                              key={notif._id}
                              onClick={() => {
                                setSelectedChat(notif.chat);
                                setNotification(notification.filter((n) => n !== notif));
                              }}
                            >
                              {notif.chat.isGroupChat
                                ? `New Message in ${notif.chat.chatName}`
                                : `New Message from ${getSender(user, notif.chat.users)}`}
                            </MenuItem>
                           ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                          <Avatar
                            size="sm"
                            cursor="pointer"
                            name={user.userName}
                            src={user.pic}
                          />
                        </MenuButton>
                         <MenuList>
                            <ProfileModal user={user}>
                              <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                  <DrawerBody>
                    <Box display="flex" pb={2}>
                      <Input
                        placeholder="Search by name or email"
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button onClick={handleSearch}>Go</Button>
                    </Box>
                    {loading ? (
                      <ChatLoading />
                    ) : (
                      searchResult?.map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessChat(user._id)}
                        />
                      ))
                    )}
                    {loadingChat && <Spinner ml="auto" display="flex" />}
                  </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer;