import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";
import { SocketContext } from "../../context/SocketContext";

export default function Statistics(){
   const socket = useContext(SocketContext);
   const [clientsCount, setClientsCount] = useState<number>(0);

   useEffect(() => {
      // Listen for initial clients count when connected
      socket.on("getClientsCount", (count: number) => {
         console.log("Connected users count:", count);
         setClientsCount(count);
      });

      // Listen for new user connections
      socket.on("userConnected", (data: { totalClients: number; message: string }) => {
         console.log(data.message);
         setClientsCount(data.totalClients);
      });

      // Listen for user disconnections
      socket.on("userDisconnected", (data: { totalClients: number; message: string }) => {
         console.log(data.message);
         setClientsCount(data.totalClients);
      });

      // Cleanup listeners on unmount
      return () => {
         socket.off("getClientsCount");
         socket.off("userConnected");
         socket.off("userDisconnected");
      };
   }, [socket]);

   return (
      <div className={"static-frame"}>
         <Container> 
            <Stack className="info">

               <Stack className="static-box">
                  <Box className="static-num">12</Box>
                  <Box className="static-text">STORE</Box>   
               </Stack> 

               <Divider height="70" width="2" bg="#c8ce8dff" />

               <Stack className="static-box">
                  <Box className="static-num">8</Box>
                  <Box className="static-text">Experience</Box>   
               </Stack> 

               <Divider height="64" width="2" bg="#c8ce8dff" />

               <Stack className="static-box">
                  <Box className="static-num">50+</Box>
                  <Box className="static-text">Menu</Box>   
               </Stack> 

               <Divider height="64" width="2" bg="#c8ce8dff" />

               <Stack className="static-box">
                  <Box className="static-num" sx={{ color: "#4caf50" }}>{clientsCount}</Box>
                  <Box className="static-text">Online Users</Box>   
               </Stack> 

            </Stack> 
         </Container>
      </div>
   );
}