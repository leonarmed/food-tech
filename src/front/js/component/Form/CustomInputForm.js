import React from "react";
import { Controller } from "react-hook-form";
import CustomInput from "./CustomInput";

function CustomInputForm({ name, control, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CustomInput onChange={onChange} value={value} {...rest} />
      )}
    />
  );
}

export default CustomInputForm;
