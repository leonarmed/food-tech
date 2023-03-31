import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import plato from "../../../../img/1.png";
import { Star as StarIcon } from "@mui/icons-material";

export default function Menus({ products }) {
  const [currentProduct, setCurrentProduct] = useState(products[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Get the index of the next product in the array
      const nextIndex =
        (products.indexOf(currentProduct) + 1) % products.length;
      // Set the state to the next product
      setCurrentProduct(products[nextIndex]);
    }, 2000); // 60 seconds = 60000

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentProduct]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffffc4",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box display="flex" justifyContent="space-around" alignItems="baseline">
          <Typography variant="h4">{currentProduct.name}</Typography>
          <Box display="flex" alignItems="baseline">
            <Typography variant="h3">{currentProduct.price}</Typography>
            <Typography variant="h5">Gs</Typography>
          </Box>
        </Box>
        <Divider style={{ height: "2px", borderRadius: "10px" }} />
        <List
          sx={{
            width: "100%",
          }}
          aria-label="ingredients"
        >
          <Grid container spacing={2}>
            {currentProduct.ingredients.map((ingredient, index) => {
              return (
                <Grid item xs={3}>
                  <ListItem disablePadding key={index}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                </Grid>
              );
            })}
          </Grid>
        </List>
      </Box>
      <Box display="flex" justifyContent="center">
        <img src={plato} alt="Combo" />
      </Box>
    </>
  );
}
