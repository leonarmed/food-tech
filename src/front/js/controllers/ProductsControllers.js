import React, { useContext, useCallback, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import useModal from "../hooks/useModal";

export default function ProductsControllers() {
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
      field: "barcode",
      label: "Código",
      type: "text",
      valueGetter: ({ row }) => row?.barcode,
    },
    {
      field: "name",
      label: "Nombre",
      type: "text",
      valueGetter: ({ row }) => row?.name,
    },
    {
      field: "price",
      label: "Precio",
      type: "text",
      valueGetter: ({ row }) => row?.price,
    },
    {
      field: "ingredients",
      label: "Ingredientes",
      type: "array",
      valueGetter: ({ row }) => row?.ingredients,
    },
    {
      field: "picture",
      label: "Imagen",
      type: "component",
      valueGetter: ({ row }) => MemoizedImageComponent(row?.picture),
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

  const rowsProducts = [
    {
      id: "1",
      barcode: "1564087",
      name: "Yakisoba",
      price: "154.148",
      ingredients: ["1", "2", "3"],
      createdAt: "01/04/2023",
      updatedAt: "20/04/2023",
      status: "pending",
    },
    {
      id: "2",
      barcode: "5122262",
      name: "Tequeños",
      price: "35.000",
      ingredients: ["4", "5", "6"],
      picture: "https://i.blogs.es/be8ee2/yakisoba/1366_2000.jpg",
      createdAt: "01/04/2023",
      updatedAt: "20/04/2023",
      status: "active",
    },
    {
      id: "3",
      barcode: "1564087",
      name: "Patacon playero",
      price: "40.000",
      ingredients: ["7", "8", "9"],
      picture: "https://i.blogs.es/be8ee2/yakisoba/1366_2000.jpg",
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
    rowsProducts,
    handleClickRow,
    isShowing,
    toggle,
  };
}
