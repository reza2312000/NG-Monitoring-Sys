import Footer from "@/components/Footer";
import { useStateBasketContext } from "@/context/StateBasketContext";
import ModalAddPart from "../ModalViews/ModalAddPart";
import { useEffect } from "react";
import { useDataControllerContext } from "@/context/DataControllerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import ModalUpdatePart from "../ModalViews/ModalUpdatePart";
import ModalDeleteData from "../ModalViews/ModalDeleteData";

const KelolaPartViews = () => {
  const {
    isModalAddPartOpen,
    setIsModalAddPartOpen,
    isModalUpdatePartOpen,
    isModalDeleteDataOpen,
    setIsModalUpdatePartOpen,
    setIsModalDeleteDataOpen,
    allDataPart,
  } = useStateBasketContext();
  const { getAllPart, getPartById, deletePart } = useDataControllerContext();

  useEffect(() => {
    getAllPart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="border-2 bg-white p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">Kelola Part</h1>
            <h1 className="font-bold text-blue-600 me-2">Admin</h1>
          </div>
          <hr className="mt-2 mb-2" />
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalAddPartOpen(true)}
              className="btn btn-sm btn-success text-white"
            >
              Tambah Part
            </button>
          </div>
          <table className="table border mt-3">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Kode Part</th>
                <th className="text-center">Nama Part</th>
                <th className="text-center">Estimasi Berat Part (Per Pc)</th>
                <th className="text-center">Toleransi Berat Aktual (Per Pc)</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allDataPart?.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.kode}</td>
                  <td className="text-center">{item.nama}</td>
                  <td className="text-center">{item.estimasiBerat}</td>
                  <td className="text-center">{item.tolerance}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        getPartById(item.id);
                        setIsModalUpdatePartOpen(true);
                      }}
                      className="btn btn-sm btn-info"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                    onClick={() => {
                      getPartById(item.id);
                      setIsModalDeleteDataOpen(true);
                    }} 
                    className="btn btn-sm btn-error ms-1">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
      {isModalAddPartOpen && <ModalAddPart />}
      {isModalUpdatePartOpen && <ModalUpdatePart />}
      {isModalDeleteDataOpen && <ModalDeleteData clickFunction={deletePart}/>}
    </div>
  );
};
export default KelolaPartViews;
