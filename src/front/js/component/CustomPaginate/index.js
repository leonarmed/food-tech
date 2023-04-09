import React from "react";
import { Refresh } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, TablePagination, Tooltip } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function CustomPaginate({
  variant,
  count,
  page,
  limit,
  onRefresh,
  isFetching = false,
}) {
  const [params, setParams] = useSearchParams();
  const handlePageChange = (event, newPage) => {
    if (
      event.target.dataset.testid === "KeyboardArrowLeftIcon" &&
      newPage === 0
    ) {
      params.delete("page");
    } else {
      params.set("page", `${newPage}`);
    }
    setParams(params, { replace: true });
  };

  const handleLimitChange = (event) => {
    params.set("limit", `${event.target.value}`);
    params.delete("page");
    setParams(params, { replace: true });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      alignItems="center"
      sx={{ p: 1.5 }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {variant === "paginate" && (
          <TablePagination
            component="div"
            count={count}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={Number(page)}
            rowsPerPage={Number(limit)}
            rowsPerPageOptions={[10, 20, 30, 40, 1000]}
            labelRowsPerPage="Registros por páginas"
          />
        )}
        {onRefresh && (
          <Tooltip title="Refrescar el listado" arrow>
            <span>
              <LoadingButton
                onClick={onRefresh}
                loading={isFetching}
                variant="outlined"
                size="small"
                sx={{ height: 30 }}
                disabled={isFetching}
              >
                <Refresh />
              </LoadingButton>
            </span>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}

export default CustomPaginate;
