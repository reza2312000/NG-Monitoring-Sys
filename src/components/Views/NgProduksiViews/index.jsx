import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";
import {
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import ModalAddData from "../ModalViews/ModalAddData";
import Footer from "@/components/Footer";
import ModalUpdateData from "../ModalViews/ModalUpdateData";
import ModalDeleteData from "../ModalViews/ModalDeleteData";
import ModalNewReport from "../ModalViews/ModalNewReportViews";

const NgProduksiViews = () => {
  const { data: session } = useSession();
  const {
    allDataByNik,
    shift,
    date,
    machine,
    setMachine,
    setShift,
    setDate,
    isModalNewReportOpen,
    isModalAddDataOpen,
    isModalUpdateDataOpen,
    isModalDeleteDataOpen,
    setIsModalAddDataOpen,
    setIsModalNewReportOpen,
    setIsModalUpdateDataOpen,
    isError,
    allDataPart
  } = useStateBasketContext();
  const { getDataByNik, getAllPart, getDataById, deleteData } = useDataControllerContext();

  const weightToleranceFilter = (part) => {
    const filteredPart = allDataPart.filter((item) => item.nama === part);
    let tolerance
    if (filteredPart) {
      filteredPart?.map((item)=>(
        tolerance = item.tolerance
      ))
      return tolerance
    }
  };

  useEffect(() => {
    getDataByNik();
    getAllPart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="container bg-white min-h-screen shadow-xl border-2 p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">Input NG </h1>
            <h1 className="font-bold text-blue-600 me-2">Operator Produksi</h1>
          </div>
          <hr className="mt-2" />
          <div className="container">
            <div className="py-3">
              <div className="flex items-center justify-between border-2 rounded-lg p-2">
                <p className="font-semibold">
                  Mesin :
                  <span className="me-4">
                    <select
                      value={machine}
                      onChange={(e) => setMachine(e.target.value)}
                      className="select select-sm select-bordered mt-1 ms-2"
                      required
                    >
                      <option value="Mesin 1">Mesin 1</option>
                      <option value="Mesin 2">Mesin 2</option>
                      <option value="Mesin 3">Mesin 3</option>
                    </select>
                  </span>
                </p>
                <div className="flex">
                  <p className="font-semibold">
                    Shift :
                    <span className="me-4">
                      <select
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        className="select select-sm select-bordered mt-1 ms-2"
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </span>
                  </p>
                  <p className={isError ? "text-error font-semibold" : "font-semibold"}>
                    Tanggal :
                    <span>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={isError ? "input input-sm input-bordered border-red-500 mt-1 ms-2" : "input input-sm input-bordered mt-1 ms-2"}
                        required
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-2 rounded px-3">
              <div className="flex justify-between my-3">
                <button
                  onClick={() => setIsModalAddDataOpen(true)}
                  className="btn btn-sm btn-primary shadow-md shadow-gray-300 border-2"
                >
                  Tambah
                  <span className="ms-1">
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </span>
                </button>
                <button
                  onClick={()=> setIsModalNewReportOpen(true)}
                  className="btn btn-sm btn-info text-white shadow-md shadow-gray-300 border-2"
                >
                  Laporan Baru
                  <span className="ms-1">
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </span>
                </button>
              </div>
              <table className="table border my-2">
                <thead>
                  <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Nama Part</th>
                    <th className="text-center">Jenis NG</th>
                    <th className="text-center">Jumlah</th>
                    <th className="text-center">Total Berat (Estimasi)</th>
                    <th className="text-center">Total Berat (Aktual)</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDataByNik.map((item, index) => {
                    const tolerance = weightToleranceFilter(item.data_NG.part);
                    const isOverTolerance = item.data_NG.aktual_berat >=
                    item.data_NG.estimasi_berat + tolerance;
                    return (
                      <tr
                        key={item.id}
                        className={isOverTolerance ? "bg-red-600/30" : ""}
                      >
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{item.data_NG.part}</td>
                        <td className="text-center">{item.data_NG.jenis_NG}</td>
                        <td className="text-center text-error font-semibold">
                          {item.data_NG.jumlah_NG} pcs
                        </td>
                        <td className="text-center text-primary font-semibold">
                          {item.data_NG.estimasi_berat} gr
                        </td>
                        <td className="text-center text-green-600 font-semibold">
                          {item.data_NG.aktual_berat
                            ? `${item.data_NG.aktual_berat} gr`
                            : "-"}
                        </td>
                        <td className="text-center">
                          <span
                            className={
                              item.status === "ACC"
                                ? "badge badge-accent"
                                : item.status === "Disapprove"
                                ? "badge badge-error text-white"
                                : "badge badge-warning"
                            }
                          >
                            {item.status ? item.status : "Waiting"}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              getDataById(item.id);
                              setIsModalUpdateDataOpen(true);
                            }}
                            className="btn btn-sm btn-neutral"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {isModalNewReportOpen && <ModalNewReport />}
      {isModalAddDataOpen && <ModalAddData />}
      {isModalUpdateDataOpen && <ModalUpdateData />}
      {isModalDeleteDataOpen && <ModalDeleteData  clickFunction={deleteData}/>}
    </div>
  );
};

export default NgProduksiViews;
