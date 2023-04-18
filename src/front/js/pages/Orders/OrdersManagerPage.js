import { Box, Typography, Divider } from "@mui/material";
import SimpleTable from "../../component/Table";
import React from "react";
import OrdersControllers from "../../controllers/OrdersControllers";
import ModalUpdateProduct from "./ModalUpdateOrder";

export default function OrdersManagerPage() {
  const { columnsHeader, rowsOrders, handleClickRow, isShowing, toggle } =
    OrdersControllers();
  return (
    <Box>
      <Box>
        <Typography variant="h5">Ordenes</Typography>
        <Divider />
      </Box>
      <SimpleTable
        variant="paginate"
        columns={columnsHeader}
        rows={rowsOrders}
        withoutHeight
        totalCount={1}
        currentPage={0}
        limit={"10"}
        // onRefresh={() => refetch()}
        // isLoading={isLoadingFetch}
        // isFetching={isFetching}
        onSelectedRow={handleClickRow}
      />
      <ModalUpdateProduct isShowing={isShowing} toggle={toggle} />
    </Box>
  );
}
