import React from "react";
import { Container, Stack } from "@mui/material";
import { CssVarsProvider, Typography } from "@mui/joy";
import { AspectRatio, Box, CardOverflow } from "@mui/joy";
import Card from "@mui/joy/Card";

import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import {  retrieveTopUsers } from "./selector";
import {Member} from "../../../lib/data/types/member"
import { serverApi } from "../../../lib/data/config";

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers)=> ({topUsers})
);

export function ActiveUsers() {
    const {topUsers} = useSelector(topUsersRetriever);
   return (
      <div className={"active-users-frame"}>
         <Container>
            <Stack className={"main"}>
               <Box className={"category-title"}>Active Users</Box>
               <Stack className={"cards-frame"}>

                  <CssVarsProvider>
                     {topUsers.length !== 0 ? (
                        topUsers.map((member: Member) => {
                           const imagePath = `${serverApi}/${member.memberImage}`
                           return (
                              <Card key={member._id} className="card" >
                                 <CardOverflow> 
                                   <AspectRatio ratio="1">
                                      <img src={imagePath} alt="" />
                                   </AspectRatio>
                                </CardOverflow>

                                <Typography className={"member-nickname"}>
                                  {member.memberNick}
                                </Typography>
                              </Card>
                           )
                        })
                     ) : (
                     <Box className="no-data">No Active Users Yet!</Box>
                     
                     )}
                  </CssVarsProvider>

               </Stack>
            </Stack>
         </Container>
      </div> 
   );
}