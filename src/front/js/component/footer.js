import React from "react";
import { Typography } from "@mui/material";

const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <Typography variant="caption">
      © {year}{" "}
      <a href="https://www.sispycom.com" target="_blank" rel="noreferrer">
        Sispycom - Paraguay
      </a>
      , All rights reserved.
    </Typography>
  </footer>
);
