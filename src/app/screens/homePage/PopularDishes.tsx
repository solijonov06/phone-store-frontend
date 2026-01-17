import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/data/config";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  console.log("popularDishes:", popularDishes);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="card"  sx={{ width: 300, minHeight: '430px' }}>
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
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                          <Typography
                            level="body-xs"
                            textColor="text.secondary"
                            sx={{ fontWeight: 'md' }}
                          >
                            {product.productViews} <VisibilityIcon sx={{ fontSize: 16, marginLeft: "2px" }} />
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            textColor="text.secondary"
                            sx={{ fontWeight: 'md' }}
                          >
                           $ {product.productPrice} {/* Simplified to a static value; adjust as needed */}
                          </Typography>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}