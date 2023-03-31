import React from "react";
import { Box, Grid, Paper } from "@mui/material";

const orders = [
  { id: 1, state: "Orden lista" },
  { id: 2, state: "En preparación" },
  { id: 80, state: "En preparación" },
];

export default function OrdersItem() {
  return (
    <Box>
      {orders
        ? orders.map((order) => {
            return (
              <Paper
                elevation={12}
                className="orders"
                key={order.id}
                style={{
                  backgroundColor: `${
                    order.state === "En preparación" ? "#ffb63f" : "#81f23c"
                  }`,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={1}
                  height="100%"
                >
                  <Box width="140px" textAlign="left" marginLeft="20px">
                    {order.state}
                  </Box>
                  <Box>|</Box>
                  <Box
                    width="70px"
                    textAlign="center"
                    fontSize="25px"
                    fontWeight="bold"
                  >
                    {order.id}
                  </Box>
                </Box>
              </Paper>
            );
          })
        : "En espera"}
    </Box>
  );
}
