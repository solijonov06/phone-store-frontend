import React, { useState } from "react";
import {Box, Button, Container, Stack,  Typography } from "@mui/material";
import { Link, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UsersPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { T } from "../lib/data/common";
import { Messages } from "../lib/data/config";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/data/sweetAlert";
import MemberService from "./sevices/MemberService";
import { useGlobals } from "./hooks/useGlobals";
import {  } from "react-router-dom";
import { Switch } from "react-router-dom";

function App() {

  const location = useLocation();
  console.log("locati on:", location);
const {cartItems, onAdd, onDelete, onDeleteAll, onRemove}= useBasket();
const{setAuthMember} = useGlobals();
const [signupOpen, setSignupOpen]=useState<boolean>(true);
const [loginOpen, setLoginOpen]=useState<boolean>(false);
const [anchorEl, setAnchorEl]=useState<HTMLElement | null >(null);

/**HANDLERS */

const handleSignupClose =()=> setSignupOpen(false);
const handleLoginClose =()=> setLoginOpen(false);

const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(e.currentTarget);
};
const handleCloseLogout = () => setAnchorEl(null);
const handleLogoutRequest = async () => {
  try{
    const member = new MemberService();
    await member.logout();
    await sweetTopSuccessAlert("succes",700)
    setAuthMember(null);
  }catch(err){
    console.log(err);
    sweetErrorHandling(Messages.error1)
    
  }
}
  return (
    <>
        {location.pathname === "/" ? <HomeNavbar 
        cartItems={cartItems}
        onRemove={onRemove}
        onAdd={onAdd}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll} 
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}

        /> 
        : <OtherNavbar cartItems={cartItems}
         onRemove={onRemove}
         onAdd={onAdd}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
        />}
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products">
            <ProductsPage onAdd ={onAdd}/>
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route> 
          <Route path="/member-page">
            <UsersPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/">
             <HomePage /> 
          </Route>
        </Switch>
          <Footer />
          <AuthenticationModal
          signupOpen={signupOpen}
          loginOpen = {loginOpen}
          handleLoginClose={handleLoginClose}
           handleSignupClose={handleSignupClose}/>
      </>
  );
}

export default App;


// screens component 
// sectional component
// reusable component