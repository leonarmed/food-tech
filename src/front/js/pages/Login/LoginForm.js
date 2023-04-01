import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import CustomInputForm from "../../component/Form/CustomInputForm";
import FormContainer from "../../component/Form/FormContainer";
import LoginControllers from "../../controllers/LoginControllers";
import Logo from "../../../img/SISPYCOM.png";

export default function LoginForm() {
  const { handleSubmitData, onSendSubmit, controlInputs, errorsData } =
    LoginControllers();

  return (
    <FormContainer
      mode="form"
      onSubmit={handleSubmitData(onSendSubmit)}
      style={{ background: "none" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="left" padding={2}>
          <img src={Logo} alt="logo" width="150px" />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Typography variant="h4" align="left">
            Iniciar Sesión
          </Typography>
          <Typography variant="caption" align="left">
            Portal para el control de temperatura
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomInputForm
            name="email"
            control={controlInputs}
            error={errorsData.email}
            label="Correo electrónico"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInputForm
            name="password"
            type="password"
            control={controlInputs}
            error={errorsData.password}
            label="Contraseña"
          />
        </Grid>
        {/* <Box display="flex" justifyContent="right" width="100%">
          <Link
            style={{ color: "#1c3d53", fontSize: "12px" }}
            to="/lostpassword"
          >
            Olvidé mi contraseña
          </Link>
        </Box> */}
        <Grid item xs={12} display="flex" justifyContent="center" pb={2}>
          <Button type="submit" variant="contained" size="small">
            Iniciar
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
