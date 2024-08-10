import React, { createContext, useContext, useState } from "react";
import { useStateBasketContext } from "./StateBasketContext";

const ToggleFunctionContext = createContext();

export const ToggleFunctionContextProvider = ({ children }) => {
  const {
    setIsNgProduksiBtnClicked,
    setIsLaporanNgBtnClicked,
    setIsNgKeluarBtnClicked,
    setIsHistoryBtnClicked,
    setIsDashboardBtnClicked,
    setIsKelolaPartBtnClicked
  } = useStateBasketContext();

  const toggleDashboard = () => {
    setIsDashboardBtnClicked(true)
    setIsNgProduksiBtnClicked(false);
    setIsLaporanNgBtnClicked(false);
    setIsNgKeluarBtnClicked(false);
    setIsHistoryBtnClicked(false);
    setIsKelolaPartBtnClicked(false);
  };

  const toggleNgProduksi = () => {
    setIsNgProduksiBtnClicked(true);
    setIsDashboardBtnClicked(false)
    setIsLaporanNgBtnClicked(false);
    setIsNgKeluarBtnClicked(false);
    setIsHistoryBtnClicked(false);
    setIsKelolaPartBtnClicked(false);
  };

  const toggleLaporanNg = () => {
    setIsLaporanNgBtnClicked(true);
    setIsDashboardBtnClicked(false)
    setIsNgProduksiBtnClicked(false);
    setIsNgKeluarBtnClicked(false);
    setIsHistoryBtnClicked(false);
    setIsKelolaPartBtnClicked(false);
  };

  const toggleNgKeluar = () => {
    setIsNgKeluarBtnClicked(true);
    setIsDashboardBtnClicked(false)
    setIsLaporanNgBtnClicked(false);
    setIsNgProduksiBtnClicked(false);
    setIsHistoryBtnClicked(false);
    setIsKelolaPartBtnClicked(false);
  };

  const toggleHistory = () => {
    setIsHistoryBtnClicked(true);
    setIsDashboardBtnClicked(false)
    setIsNgKeluarBtnClicked(false);
    setIsLaporanNgBtnClicked(false);
    setIsNgProduksiBtnClicked(false);
    setIsKelolaPartBtnClicked(false);
  };

  const toggleKelolaPart = () => {
    setIsKelolaPartBtnClicked(true);
    setIsHistoryBtnClicked(false);
    setIsDashboardBtnClicked(false)
    setIsNgKeluarBtnClicked(false);
    setIsLaporanNgBtnClicked(false);
    setIsNgProduksiBtnClicked(false);
  }

  const contextValue = {
    toggleDashboard,
    toggleNgProduksi,
    toggleLaporanNg,
    toggleNgKeluar,
    toggleHistory,
    toggleKelolaPart
  };

  return (
    <ToggleFunctionContext.Provider value={contextValue}>
      {children}
    </ToggleFunctionContext.Provider>
  );
};

export const useToggleFunctionContext = () => {
  const context = useContext(ToggleFunctionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
