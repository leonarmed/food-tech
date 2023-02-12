/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from "react";
import { Box, Paper } from "@mui/material";

function FormContainer({ children, mode = "div", ...rest }) {
  return (
    <Paper
      elevation={0}
      component={mode}
      role={mode}
      className="form-container"
      onSubmit={"onSubmit" in rest ? rest.onSubmit : undefined}
      {...rest}
    >
      <Box sx={{ py: 1, px: 2 }}>{children}</Box>
    </Paper>
  );
}

export default memo(FormContainer);
