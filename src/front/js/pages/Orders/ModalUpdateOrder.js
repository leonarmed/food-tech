import React from "react";
import CustomModal from "../../component/CustomModal";
import { Typography, Divider, Box, Grid, Button, Paper } from "@mui/material";

export default function ModalUpdateOrder({ isShowing, toggle }) {
  return (
    <CustomModal open={isShowing} modalClose={toggle}>
      <Typography variant="h5">Actualizar Orden {`id`}</Typography>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" justifyContent="space-evenly" width="100%" p={4}>
          <Button variant="outlined" color="error" sx={{ width: "150px" }}>
            Eliminar
          </Button>
          <Button variant="outlined" color="warning" sx={{ width: "150px" }}>
            Pendiente
          </Button>
          <Button variant="contained" color="success" sx={{ width: "150px" }}>
            Listo
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
