import React from "react";
import CustomModal from "../../component/CustomModal";
import { Typography, Divider, Box, Grid, Button, Paper } from "@mui/material";

export default function ModalUpdateProduct({ isShowing, toggle }) {
  return (
    <CustomModal open={isShowing} modalClose={toggle}>
      <Typography variant="h5">Actualizar foto del producto</Typography>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container spacing={4} m={0}>
          <Grid item xs={12} textAlign="center" p={4}>
            <img
              src={"https://i.blogs.es/be8ee2/yakisoba/1366_2000.jpg"}
              width="250px"
              style={{ borderRadius: "20px" }}
              alt="image"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-evenly" width="100%">
          <Button variant="outlined" color="error" sx={{ width: "150px" }}>
            Eliminar
          </Button>
          <Button variant="contained" color="success" sx={{ width: "150px" }}>
            Cargar foto
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
