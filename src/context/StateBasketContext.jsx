import React, { createContext, useContext, useState } from "react";

const StateBasketContext = createContext();

export const StateBasketContextProvider = ({ children }) => {
  const [isDashboardBtnClicked, setIsDashboardBtnClicked] = useState(true);
  const [isNgProduksiBtnClicked, setIsNgProduksiBtnClicked] = useState(false);
  const [isLaporanNgBtnClicked, setIsLaporanNgBtnClicked] = useState(false);
  const [isNgKeluarBtnClicked, setIsNgKeluarBtnClicked] = useState(false);
  const [isKelolaPartBtnClicked, setIsKelolaPartBtnClicked] = useState(false);
  const [isHistoryBtnClicked, setIsHistoryBtnClicked] = useState(false);

  const [isUiHeaderDisabled, setIsUiHeaderDisabled] = useState(false);

  const [docId1, setDocId1] = useState("");
  const [docId2, setDocId2] = useState("");
  const [docId3, setDocId3] = useState("");
  const [part, setPart] = useState("CT78");
  const [shift, setShift] = useState("1");
  const [machine, setMachine] = useState("Mesin 1");
  const [date, setDate] = useState("");
  const [jenisNg, setJenisNg] = useState("Patah");
  const [jumlahNg, setJumlahNg] = useState(null);
  const [dataTotal, setDataTotal] = useState();
  const [status, setStatus] = useState("Waiting");
  const [estimasiTotalBerat, setEstimasiTotalBerat] = useState(null);
  const [actualTotalBerat, setActualTotalBerat] = useState(null);
  const [kodePart, setKodePart] = useState("");
  const [namaPart, setNamaPart] = useState("");
  const [estimasiBeratPart, setEstimasiBeratPart] = useState(null);
  const [weightTolerance, setWeightTolerance] = useState(null);

  const [selectedPart, setSelectedPart] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedJenisNg, setSelectedJenisNg] = useState("");
  const [selectedJumlahNg, setSelectedJumlahNg] = useState();
  const [selectedEstimasiBerat, setSelectedEstimasiBerat] = useState();
  const [selectedActualBerat, setSelectedActualBerat] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const [allDataReport, setAllDataReport] = useState([]);
  const [allDataPart, setAllDataPart] = useState([]);
  const [allDataByNik, setAllDataByNik] = useState([]);
  const [recordData, setRecordData] = useState([]);

  const [isModalAddDataOpen, setIsModalAddDataOpen] = useState(false);
  const [isModalUpdatePartOpen, setIsModalUpdatePartOpen] = useState(false);
  const [isModalAddPartOpen, setIsModalAddPartOpen] = useState(false);
  const [isModalUpdateDataOpen, setIsModalUpdateDataOpen] = useState(false);
  const [isModalDeleteDataOpen, setIsModalDeleteDataOpen] = useState(false);
  const [isModalNewReportOpen, setIsModalNewReportOpen] = useState(false);
  const [isModalChangeStatusOpen, setIsModalChangeStatusOpen] = useState(false);
  const [isModalAddActualWeightOpen, setIsModalAddActualWeightOpen] =
    useState(false);

  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isError, setIsError] = useState(false);

  const contextValue = {
    isLaporanNgBtnClicked,
    isNgProduksiBtnClicked,
    isHistoryBtnClicked,
    isDashboardBtnClicked,
    isKelolaPartBtnClicked,
    setIsKelolaPartBtnClicked,
    setIsDashboardBtnClicked,
    setIsHistoryBtnClicked,
    setIsNgProduksiBtnClicked,
    setIsLaporanNgBtnClicked,
    allDataPart, 
    setAllDataPart,
    part,
    shift,
    machine,
    date,
    dataTotal,
    jenisNg,
    jumlahNg,
    kodePart, 
    namaPart, 
    estimasiBeratPart, 
    setKodePart,
    setNamaPart,
    setEstimasiBeratPart,
    setDataTotal,
    setJenisNg,
    setJumlahNg,
    setPart,
    setShift,
    setMachine,
    setDate,
    isUiHeaderDisabled,
    allDataReport,
    recordData,
    allDataByNik,
    setAllDataByNik,
    setRecordData,
    setAllDataReport,
    setIsUiHeaderDisabled,
    docId1,
    docId2,
    docId3,
    setDocId1,
    setDocId2,
    setDocId3,
    isModalAddDataOpen,
    isModalUpdateDataOpen,
    isModalChangeStatusOpen,
    isModalNewReportOpen,
    setIsModalNewReportOpen,
    setIsModalChangeStatusOpen,
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    selectedPart,
    selectedShift,
    selectedMachine,
    selectedDate,
    selectedJenisNg,
    selectedJumlahNg,
    setSelectedMachine,
    setSelectedPart,
    setSelectedShift,
    setSelectedDate,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    isModalDeleteDataOpen,
    isModalAddActualWeightOpen,
    setIsModalAddActualWeightOpen,
    setIsModalDeleteDataOpen,
    isWrongPassword,
    setIsWrongPassword,
    isBtnLoading,
    isError,
    setIsError,
    password,
    setPassword,
    setIsBtnLoading,
    errorMessage,
    setErrorMessage,
    estimasiTotalBerat,
    selectedEstimasiBerat,
    setEstimasiTotalBerat,
    selectedActualBerat,
    setSelectedActualBerat,
    setSelectedEstimasiBerat,
    status,
    setStatus,
    selectedStatus,
    setSelectedStatus,
    actualTotalBerat,
    selectedEstimasiBerat,
    isNgKeluarBtnClicked,
    setActualTotalBerat,
    setSelectedEstimasiBerat,
    setIsNgKeluarBtnClicked,
    weightTolerance,
    setWeightTolerance,
    isModalAddPartOpen,
    setIsModalAddPartOpen,
    isModalUpdatePartOpen,
    setIsModalUpdatePartOpen,
  };

  return (
    <StateBasketContext.Provider value={contextValue}>
      {children}
    </StateBasketContext.Provider>
  );
};

export const useStateBasketContext = () => {
  const context = useContext(StateBasketContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
