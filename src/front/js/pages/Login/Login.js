import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import imgLogin from "../../../img/login-bg.jpg";

function Login() {
  return (
    <div className="login-container">
      <div className="bg-container">
        <div className="bg-img" />
        <div className="bg-blue" />
      </div>
      <div className="form-login-container">
        <Container>
          <Paper elevation={3} className="paper-form-login">
            <Grid
              container
              spacing={2}
              sx={{
                height: "97%",
              }}
            >
              <Grid
                item
                sm={12}
                md={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoginForm />
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                sx={{ display: 'flex' }}
                className="image-login"
              >
                <img
                  src={imgLogin}
                  alt="imagelogin"
                  className="right-img-login"
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
export default Login;
