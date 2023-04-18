import React, { useContext, useCallback, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import useModal from "../hooks/useModal";

export default function OrdersControllers() {
  const { store, actions } = useContext(Context);
  const [params, setParams] = useSearchParams();
  const idParams = params.get("id") ?? undefined;
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();

  const MemoizedImageComponent = useCallback(
    (srcImg) =>
      srcImg === undefined ? null : (
        <img
          src={srcImg}
          alt="img"
          width="70px"
          style={{ borderRadius: "10px" }}
        />
      ),
    []
  );

  const columnsHeader = [
    {
      // rol: 'admin',
      field: "ticket",
      label: "Ticket",
      type: "text",
      valueGetter: ({ row }) => row?.ticket,
    },
    {
      field: "createdAt",
      label: "Creado",
      type: "text",
      valueGetter: ({ row }) => row?.createdAt,
    },
    {
      field: "updatedAt",
      label: "Actualizado",
      type: "text",
      valueGetter: ({ row }) => row?.updatedAt,
    },
    {
      field: "status",
      label: "Estado",
      type: "text",
      valueGetter: ({ row }) => row?.status,
    },
  ];

  const rowsOrders = [
    {
      id: "1",
      ticket: "1564087",
      createdAt: "01/04/2023",
      updatedAt: "20/04/2023",
      status: "pending",
    },
    {
      id: "2",
      ticket: "5122262",
      createdAt: "01/04/2023",
      updatedAt: "20/04/2023",
      status: "active",
    },
    {
      id: "3",
      ticket: "1564087",
      createdAt: "01/04/2023",
      updatedAt: "20/04/2023",
      status: "inactive",
    },
  ];

  const handleClickRow = (row) => {
    params.set("id", row.id);
    setParams(params, { replace: true });
    toggle();
  };

  return {
    columnsHeader,
    rowsOrders,
    handleClickRow,
    isShowing,
    toggle,
  };
}
