import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setChosenProduct, setSTORE} from "./slice"
import {createSelector} from "reselect";
import { retrieveChosenProduct, retrieveSTORE } from "./selector";
import {Product} from "../../../lib/data/types/product"
import { useParams } from "react-router-dom";
import ProductService from "../../sevices/ProductService";
import MemberService from "../../sevices/MemberService";
import { Member } from "../../../lib/data/types/member";
import { serverApi } from "../../../lib/data/config";
import { CartItem } from "../../../lib/data/types/search";

/**REDUC SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
   setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setSTORE: (data: Member) => dispatch(setSTORE(data))
})

const STORERetriever = createSelector(
  retrieveSTORE,
  (STORE)=>({STORE})
)
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct)=>({chosenProduct})
)

interface ChosenProductProps{
  onAdd: (item: CartItem)=>void
}

export default function ChosenProduct(props: ChosenProductProps) {
  const {onAdd} = props;
const {productId}=useParams<{productId: string}>();
const {setSTORE, setChosenProduct} = actionDispatch(useDispatch())
const {chosenProduct} = useSelector(chosenProductRetriever)
const {STORE} = useSelector(STORERetriever)
console.log("productId:",productId)

useEffect(()=>{
  const product = new ProductService();
  product
  .getProduct(productId)
  .then((data)=>setChosenProduct(data))
  .catch((err)=> console.log(err))

  const member = new MemberService();
  member
  .getStore()
  .then((data)=>setSTORE(data))
  .catch((err)=> console.log(err))
},[])

if(!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map(
              (ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`

                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{STORE?.memberNick}</span>
             <span className={"resto-name"}>{STORE?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>Our best product</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>{chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
               onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                        console.log("button pressed")
                        onAdd({
                          _id: chosenProduct._id,
                          quantity: 1,
                          name: chosenProduct.productName,
                          price: chosenProduct.productPrice,
                          image: chosenProduct.productImages[0],
                        })
                        e.stopPropagation()}}
              variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}