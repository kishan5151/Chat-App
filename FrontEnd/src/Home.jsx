import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from "./componant/Login";
import SidePage from "./componant/SidePage";
import Registration from "./componant/Registration";

const Home=()=>{
    return(
        <>
          <div className=" container-fluid mainCon">
              <div className="LogRegCon row">
                  <div className=" col-lg-5 col-sm-6 col-12 left container">
                      {/* {this is for Logo or extra} */}
                       <SidePage/>
                  </div>
                  <div className=" col-lg-7 col-sm-6 col-12 right">
                    <div className="Tabs">
                      <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                          <Tab px="10">Login</Tab>
                          <Tab px="10">Sing Up</Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel>
                            <Login/>
                          </TabPanel>
                          <TabPanel>
                            <Registration/>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </div>
                  </div>
              </div>
          </div>
        </>
    )
}

export default Home;