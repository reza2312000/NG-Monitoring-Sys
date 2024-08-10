import React, { createContext, useContext } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSession } from "next-auth/react";
import { useStateBasketContext } from "./StateBasketContext";
import { formatDate } from "date-fns";

const DataControllerContext = createContext();

export const DataControllerContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const {
    docId1,
    docId2,
    docId3,
    dataTotal,
    setDocId1,
    setDocId2,
    setDocId3,
    part,
    shift,
    machine,
    date,
    jenisNg,
    jumlahNg,
    status,
    estimasiTotalBerat,
    actualTotalBerat,
    setAllDataReport,
    setIsUiHeaderDisabled,
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    setIsModalDeleteDataOpen,
    setIsModalAddActualWeightOpen,
    setIsModalChangeStatusOpen,
    setIsModalNewReportOpen,
    selectedPart,
    selectedShift,
    selectedMachine,
    selectedDate,
    selectedJenisNg,
    selectedJumlahNg,
    selectedEstimasiBerat,
    selectedActualBerat,
    setSelectedPart,
    setSelectedShift,
    setSelectedMachine,
    setSelectedDate,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    setSelectedEstimasiBerat,
    setSelectedActualBerat,
    setSelectedStatus,
    setIsBtnLoading,
    setRecordData,
    setAllDataByNik,
    setDataTotal,
    setIsError,
    setIsModalAddPartOpen,
    kodePart,
    namaPart,
    estimasiBeratPart,
    setAllDataPart,
    setKodePart,
    setNamaPart,
    setEstimasiBeratPart,
    setIsModalUpdatePartOpen,
    weightTolerance, 
    setWeightTolerance, 
    allDataReport
  } = useStateBasketContext();

  const addData = async () => {
    try {
      const defaultStatus = "Waiting";
      setIsBtnLoading(true);
      if (date || date != "") {
        setIsError(false);
        const response = await axios.post("/api/data/addDataBatch", {
          name: session?.user.nama,
          nik: session?.user.nik,
          part: part,
          shift: shift,
          machine: machine,
          date: date,
          jenisNg: jenisNg,
          jumlahNg: jumlahNg,
          estimasiBerat: estimasiTotalBerat,
          status: defaultStatus,
        });
        await getAllData();
        await getDataByNik();
        setDocId1(response.data.docRefs[0]);
        setDocId2(response.data.docRefs[1]);
        setIsBtnLoading(false);
        setIsModalAddDataOpen(false);
      } else {
        setIsError(true);
        setIsBtnLoading(false);
        setIsModalAddDataOpen(false);
      }
    } catch (error) {
      setIsError(false);
      setIsBtnLoading(false);
      setIsUiHeaderDisabled(false);
    }
  };

  const addPart = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data/addPart", {
        kodePart: kodePart,
        namaPart: namaPart,
        estimasiBeratPart: estimasiBeratPart,
        tolerance: weightTolerance
      });
      await getAllPart()
      setIsModalAddPartOpen(false);
    } catch (error) {
      console.log(error);
      setIsModalAddPartOpen(false);
    }
  };

  const getAllData = async () => {
    try {
      const response = await axios.get("/api/data/getAllData");
      setAllDataReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPart = async () => {
    try {
      const response = await axios.get("/api/data/getAllPart");
      setAllDataPart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataByNik = async () => {
    const userNik = session?.user.nik;
    try {
      const response = await axios.get(
        `/api/data/getDataByNik?userNik=${userNik}`
      );
      setAllDataByNik(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPartById = async (itemId) => {
    try {
      const response = await axios.get(
        `/api/data/getPartById?docId=${itemId}`
      );
      setDocId1(response.data.id)
      setKodePart(response.data.kode),
      setNamaPart(response.data.nama),
      setEstimasiBeratPart(response.data.estimasiBerat),
      setWeightTolerance(response.data.tolerance)
    } catch (error) {
      console.log(error);
    }
  };

  const getRecordData = async () => {
    try {
      const response = await axios.get("/api/data/getRecordData");
      setRecordData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminDataById = async (itemId) => {
    try {
      const response = await axios.get(`/api/data/getAdminDataById?docId=${itemId}`);
      setDocId1(itemId);
      setDocId2(response.data.userDataReportId);
      setDocId3(response.data.recordDataId);
      setSelectedShift(response.data.shift);
      setSelectedDate(response.data.date);
      setSelectedMachine(response.data.mesin);
      setSelectedPart(response.data.data_NG.part);
      setSelectedJenisNg(response.data.data_NG.jenis_NG);
      setSelectedJumlahNg(response.data.data_NG.jumlah_NG);
      setSelectedEstimasiBerat(response.data.data_NG.estimasi_berat);
      setSelectedActualBerat(response.data.data_NG.aktual_berat);
      setSelectedStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataById = async (itemId) => {
    try {
      const response = await axios.get(`/api/data/getDataById?docId=${itemId}`);
      setDocId1(itemId);
      setDocId2(response.data.adminDataId);
      setDocId3(response.data.recordDataId);
      setSelectedShift(response.data.shift);
      setSelectedDate(response.data.date);
      setSelectedMachine(response.data.mesin);
      setSelectedPart(response.data.data_NG.part);
      setSelectedJenisNg(response.data.data_NG.jenis_NG);
      setSelectedJumlahNg(response.data.data_NG.jumlah_NG);
      setSelectedEstimasiBerat(response.data.data_NG.estimasi_berat);
      setSelectedActualBerat(response.data.data_NG.aktual_berat);
      setSelectedStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataTotal = async () => {
    try {
      const response = await axios.get("/api/data/getDataTotal");
      setDataTotal(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateData", {
        docId1: docId1,
        docId2: docId2,
        docId3: docId3,
        part: selectedPart,
        machine: selectedMachine,
        shift: selectedShift,
        date: selectedDate,
        jenisNg: selectedJenisNg,
        jumlahNg: selectedJumlahNg,
        estimasiBerat: estimasiTotalBerat,
        aktualBerat: selectedActualBerat ? selectedActualBerat : 0,
      });
      await getDataByNik();
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false), 
      setIsModalUpdateDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalUpdateDataOpen(false);
    }
  };

  const updatePart = async (e) => {
    e.preventDefault()
    try {
      setIsBtnLoading(true);
      await axios.patch("/api/data/updatePart", {
        docId1: docId1,
        kodePart: kodePart,
        namaPart: namaPart,
        estimasiBeratPart: estimasiBeratPart,
        tolerance: weightTolerance
      });
      await getAllPart();
      setIsBtnLoading(false);
      setIsModalUpdatePartOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalUpdateDataOpen(false);
    }
  };

  const updateStatus = async () => {
    try {
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateStatus", {
        docId1: docId1,
        docId2: docId2,
        docId3: docId3,
        status: status,
      });
      await getAllData();
      setIsBtnLoading(false);
      setIsModalChangeStatusOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalChangeStatusOpen(false);
    }
  };

  const updateActualWeight = async () => {
    try {
      const defaultActualBerat = 0;
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateActualWeight", {
        docId1: docId1,
        docId2: docId2,
        docId3: docId3,
        part: selectedPart,
        jenisNg: selectedJenisNg,
        jumlahNg: selectedJumlahNg,
        estimasiBerat: selectedEstimasiBerat,
        aktualBerat: actualTotalBerat ? actualTotalBerat : defaultActualBerat,
      });
      await getAllData();
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false);
    }
  };

    const newReport = async () => {
      try {
        await axios.delete("/api/data/deleteUserDataReport")
        await getDataByNik()
      setIsModalNewReportOpen(false);
      } catch (error) {
        console.log(error);
        setIsModalDeleteDataOpen(false);
        setIsModalUpdateDataOpen(false);
      }
    };

  const deleteData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.delete(`/api/data/deleteData?docId1=${docId1}&docId2=${docId2}`);
      await getAllData();
      await getDataByNik();
      setIsBtnLoading(false);
      setIsModalDeleteDataOpen(false);
      setIsModalUpdateDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsModalDeleteDataOpen(false);
      setIsModalUpdateDataOpen(false);
    }
  };

  const deletePart = async () => {
    try {
      setIsBtnLoading(true);
      await axios.delete(`/api/data/deletePart?docId=${docId1}`);
      await getAllPart()
      setIsBtnLoading(false);
      setIsModalDeleteDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsModalDeleteDataOpen(false);
    }
  };

  const deleteAllData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.delete("/api/data/deleteAllDataReport");
      await getAllData();
      await getDataByNik();
      setIsBtnLoading(false);
      setIsModalNewReportOpen(false);
    } catch (error) {
      setIsModalNewReportOpen(false);
      console.log(error);
    }
  };

  const deleteAndSumData = async (date) => {
    try {
      setIsBtnLoading(true);
      await axios.delete(`/api/data/deleteAndSumData?date=${date}`);
      await getAllData();
      await getDataByNik();
      setIsBtnLoading(false);
    } catch (error) {
      setIsModalNewReportOpen(false);
      console.log(error);
    }
  };

  const deleteAllRecordData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.delete("/api/data/deleteRecordData");
      await getRecordData();
      setIsBtnLoading(false);
      setIsModalDeleteDataOpen(false);
    } catch (error) {
      setIsModalDeleteDataOpen(false);
      console.log(error);
    }
  };

  const exportToExcel = () => {
    const dataToExport = allDataReport.map((item, index) => ({
      No: index + 1,
      Operator: item.nama,
      Mesin: item.mesin,
      "Nama Part": item.data_NG.part,
      "Jenis NG": item.data_NG.jenis_NG,
      "Jumlah (pcs)": item.data_NG.jumlah_NG,
      "Total Berat (Estimasi)": item.data_NG.estimasi_berat + " gr",
      "Total Berat (Aktual)": item.data_NG.aktual_berat
        ? `${item.data_NG.aktual_berat} gr`
        : "-",
      Tanggal: formatDate(new Date(item.date), "dd/MM/yyyy"),
      Status: item.status || "Waiting"
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Report");

    Object.keys(ws).forEach(cell => {
      if (cell.startsWith('A') || cell.startsWith('B') || cell.startsWith('C')) {
        ws[cell].s = {
          font: {
            bold: true,
            color: { rgb: "FFFFFF" }
          },
          fill: {
            fgColor: { rgb: "4F81BD" }
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          }
        };
      }
    });

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `DataReport_${new Date().toISOString()}.xlsx`);
  };

  const contextValue = {
    addData,
    addPart,
    getAllData,
    getAllPart,
    getDataByNik,
    getRecordData,
    getDataTotal,
    getDataById,
    getAdminDataById,
    getPartById,
    updateData,
    updatePart,
    deleteData,
    updateStatus,
    updateActualWeight,
    deleteAndSumData,
    deleteAllRecordData,
    deleteAllData,
    deletePart,
    newReport,
    exportToExcel,
  };

  return (
    <DataControllerContext.Provider value={contextValue}>
      {children}
    </DataControllerContext.Provider>
  );
};

export const useDataControllerContext = () => {
  const context = useContext(DataControllerContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
