import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

import { cloneElement } from "react";
import { ColumnsProps } from "./index";

function CustomTableRow({
  item,
  columns,
  onClick,
  selected = false,
  // isRowSelected = false,
  ...rest
}) {
  function renderTableCell(header) {
    switch (header.type) {
      case "text":
        return (
          <TableCell align={header.align}>
            <Typography
              variant="body2"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {header.valueGetter && header.valueGetter({ row: item })}
            </Typography>
          </TableCell>
        );
      case "component":
        return (
          <TableCell align={header.align}>
            {header.valueGetter && header.valueGetter({ row: item })}
          </TableCell>
        );
      case "array":
        return (
          <TableCell align={header.align}>
            {header.valueGetter && header.valueGetter({ row: item }).join(",")}
          </TableCell>
        );
      case "id":
        return <TableCell align={header.align}>test</TableCell>;
    }
  }

  return (
    <TableRow
      hover
      onClick={onClick ? () => onClick(item) : () => {}}
      selected={selected}
      {...rest}
    >
      {columns.map((header) =>
        cloneElement(renderTableCell(header), { key: header.field })
      )}
    </TableRow>
  );
}

export default CustomTableRow;
