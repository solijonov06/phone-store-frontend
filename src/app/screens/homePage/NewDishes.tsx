import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow } from "@mui/joy";
import CardContent from '@mui/joy/CardContent';
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/data/config";
import { ProductCollection } from "../../../lib/data/enums/product.enums";

const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ newDishes })
);

export function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  console.log("popularDishes:", newDishes);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className="main">
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.SAMSUNG
                      ? product.deviceVariants + ""
                      : product.iphoneModelVariants + " ";
                  return (
                    <Card key={product._id} variant="outlined" className={"card"} sx={{ width: 300, minHeight: '430px' }}>
                      <CardOverflow>
                        <img
                          src={imagePath}
                          alt={product.productName}
                          loading="lazy"
                        />
                      </CardOverflow>
                      <CardContent>
                        <Typography level="title-md">{product.productName}</Typography>
                        <Typography level="body-sm">{product.productDesc}</Typography>
                      </CardContent>
                      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                        <Divider 
                        // inset="context" 
                        />
                        <CardContent orientation="horizontal">
                          <Typography
                            level="body-xs"
                            textColor="text.secondary"
                            sx={{ fontWeight: 'md' }}
                          >
                            {product.productViews} <VisibilityIcon sx={{ fontSize: 16, marginLeft: "2px" }} />
                          </Typography>
                          <Divider 
                        //   orientation="vertical" 
                          />
                          <Typography
                            level="body-xs"
                            textColor="text.secondary"
                            sx={{ fontWeight: 'md' }}
                          >
                            ${product.productPrice}
                          </Typography>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}