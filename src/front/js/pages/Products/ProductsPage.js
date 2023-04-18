import { Box, Typography, Divider } from "@mui/material";
import SimpleTable from "../../component/Table";
import React from "react";
import ProductsControllers from "../../controllers/ProductsControllers";
import ModalUpdateProduct from "./ModalUpdateProduct";

export default function ProductsPage() {
  const { columnsHeader, rowsProducts, handleClickRow, isShowing, toggle } =
    ProductsControllers();
  return (
    <Box>
      <Box>
        <Typography variant="h5">Productos</Typography>
        <Divider />
      </Box>
      <SimpleTable
        variant="paginate"
        columns={columnsHeader}
        rows={rowsProducts}
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
