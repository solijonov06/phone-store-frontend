import React, { useEffect } from "react";
import  {Advertisement}  from "./Advertisement";
import { ActiveUsers } from "./ActiveUsers";
import Events from "./Events";
import { NewDishes } from "./NewDishes";
import Statistics from "./Statistics";
import { PopularDishes } from "./PopularDishes";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { useDispatch } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {Product} from "../../../lib/data/types/product"
import ProductService from "../../sevices/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enums";
import "../../../css/home.css";
import { Member } from "../../../lib/data/types/member";
import MemberService from "../../sevices/MemberService";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch)=> ({
  setPopularDishes: (data: Product[])=> dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[])=> dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[])=> dispatch(setTopUsers(data)),
});


export default function HomePage() {
  const {setPopularDishes, setNewDishes, setTopUsers} = actionDispatch(useDispatch());
//Selector: Store=> Data


useEffect(()=>{
  //Backend server data request => Data
  const product = new ProductService();
  product
  .getProducts({
    page: 1,
    limit: 8,
    order: "productViews",
  productCollection: ProductCollection.DISH,
  })
  .then((data)=>{
    console.log("data passed here:", data);
    setPopularDishes(data);
  })
  .catch((err)=> console.log(err));

   product
  .getProducts({
    page: 1,   
    limit: 8,
    order: "createdAt",
  productCollection: ProductCollection.DISH,
  })
  .then((data)=>{
    console.log("data passed here:", data);
    setNewDishes(data);
  })
  .catch((err)=> console.log(err));

   const member = new MemberService();
   member
  .getTopUsers()
  .then((data)=>setTopUsers(data))
  .catch((err)=> console.log(err));
  
},[]);
  //Slice: Data =>Store


  return <div className={"homepage"}>
    <Statistics />
    <PopularDishes />
    <NewDishes />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>
}

function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
