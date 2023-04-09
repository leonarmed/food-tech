/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import empty from "is-empty";
import CustomTableRow from "./CustomTableRow";
import CustomPaginate from "../CustomPaginate";

export default function SimpleTable({
  rows,
  columns,
  isLoading = false,
  isFetching = false,
  size = "small",
  stickyHeader = true,
  variant,
  onRefresh,
  onSelectedRow,
  selected,
  ...rest
}) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "calc(100vh - 15rem)", marginBottom: "20px" }}
      >
        {isFetching && (
          <LinearProgress variant="query" sx={{ width: "100%" }} />
        )}
        <Table stickyHeader={stickyHeader} size={size}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.label} align={col.align}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`${i}`}>
                  <TableCell colSpan={columns.length} align="center">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            {!empty(rows) &&
              !isLoading &&
              rows.map((row, index) => (
                <CustomTableRow
                  key={index}
                  columns={columns}
                  item={row}
                  onClick={onSelectedRow}
                  selected={selected ? selected({ row }) : false}
                />
              ))}
            {!isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No exiten registros.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {variant === "paginate" && (
        <CustomPaginate
          variant="paginate"
          count={rest?.totalCount || 0}
          page={Number(rest?.currentPage) || 0}
          limit={Number(rest?.limit) || 10}
          onRefresh={() => onRefresh}
          isFetching={isFetching}
        />
      )}
    </>
  );
}
