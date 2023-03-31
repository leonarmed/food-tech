import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../../../img/AvilaNikkei.png";
import OrdersItem from "./components/OrdersItem.jsx";
import bg from "../../../img/BG.png";
import plato from "../../../img/1.png";
import { Star as StarIcon } from "@mui/icons-material";

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
            <Box
              sx={{
                backgroundColor: "#ffffffc4",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="baseline"
              >
                <Typography variant="h4">Yakisoba Especial</Typography>
                <Box display="flex" alignItems="baseline">
                  <Typography variant="h3">65.000</Typography>
                  <Typography variant="h5">Gs</Typography>
                </Box>
              </Box>
              <Divider style={{ height: "2px", borderRadius: "10px" }} />
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                aria-label="ingredients"
              >
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Test 1" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Test 2" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Test 3" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Test 4" />
                </ListItem>
              </List>
            </Box>
            <Box display="flex" justifyContent="center">
              <img src={plato} alt="Combo" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
