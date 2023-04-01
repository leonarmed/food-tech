import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Container, Box, Paper, Grid } from "@mui/material";
import logo from "../../../img/AvilaNikkei.png";
import OrdersItem from "./components/OrdersItem.jsx";
import bg from "../../../img/BG.png";
import Menus from "./components/Menus.jsx";

const products = [
  {
    name: "Yakisoba Especial",
    price: "65.000",
    ingredients: ["Carne", "Pollo", "Camarones", "Locote", "Cebolla"],
    picture: "",
  },
  {
    name: "Patacon",
    price: "45.000",
    ingredients: [
      "Banana para fritar",
      "Ketchup",
      "Mayonesa",
      "Queso rayado",
      "Ensalada mixta",
    ],
    picture: "",
  },
  {
    name: "Sushi",
    price: "55.000",
    ingredients: ["Salmon", "Aguacate", "Platano", "Picante", "Queso crema"],
    picture: "",
  },
];

export const OrdersPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <Container maxWidth="fixed orders-container">
      <Grid container spacing={2} padding={4} height="100%">
        <Grid item xs={3}>
          <Box textAlign="center" height="115.5px">
            <img src={logo} alt="logo" width="150px" />
          </Box>
          <Box
            className="order-details"
            variant="outlined"
            style={{ height: "100% - 10px - 155px" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={1}
            >
              <Box width="140px" textAlign="left" marginLeft="20px">
                Estado
              </Box>
              <Box>|</Box>
              <Box width="70px" textAlign="center">
                Orden
              </Box>
            </Box>
            <OrdersItem />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Paper
            elevation={12}
            className="advertisements"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Menus products={products} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
