import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "date-fns";
import { useEffect } from "react";

const { default: Modal } = require("@/components/Modal");

const ModalUpdateData = () => {
  const {
    selectedPart,
    selectedShift,
    selectedDate,
    selectedMachine,
    selectedJenisNg,
    selectedJumlahNg,
    setSelectedPart,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    setIsModalUpdateDataOpen,
    setIsModalDeleteDataOpen,
    estimasiTotalBerat,
    setEstimasiTotalBerat,
    allDataPart, 
    part
  } = useStateBasketContext();
  const { updateData} = useDataControllerContext();

  useEffect(() => {
    const filteredPart = allDataPart.find((item) => item.nama === selectedPart);
    if (filteredPart) {
      const countTotalNg = selectedJumlahNg * filteredPart.estimasiBerat
      setEstimasiTotalBerat(countTotalNg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPart, selectedJumlahNg]);

  return (
    <Modal
      modalBody={
        <>
          <div className="flex justify-between">
            <h1>Edit Data</h1>
            <button
              onClick={() => setIsModalUpdateDataOpen(false)}
              className="me-1 mb-3"
            >
              ✕
            </button>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex justify-between px-1">
            <span className="text-sm font-semibold">
                Mesin : <span className="text-primary">{selectedMachine}</span>
              </span>
              <div>
                <span className="text-sm font-semibold">
                  Shift : <span className="text-primary ms-1">{selectedShift}</span>
                </span>
                <span className="text-sm font-semibold ms-3">
                  Date :
                  <span className="text-primary ms-1">
                    {formatDate(Date(selectedDate), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label>
                <p className="font-semibold text-sm ms-1">Nama Part :</p>
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="select select-sm select-bordered mt-1 w-full"
                >
                    {allDataPart?.map((item) => (
                    <option key={item.id} value={item.nama}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jenis NG :</p>
                <span>
                  <select
                    value={selectedJenisNg}
                    onChange={(e) => setSelectedJenisNg(e.target.value)}
                    className="select select-sm select-bordered mt-1 w-full"
                  >
                    <option value="Patah">Patah</option>
                    <option value="Retak">Retak</option>
                    <option value="Lecet">Lecet</option>
                  </select>
                </span>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jumlah NG :</p>
                <span>
                  <input
                    value={selectedJumlahNg}
                    onChange={(e) => setSelectedJumlahNg(e.target.value)}
                    type="number"
                    className="input input-sm input-bordered mt-1 w-full"
                  />
                </span>
              </label>
              <label className="flex flex-col mt-3">
              <p className="font-semibold text-sm ms-1">Estimasi Total Berat :</p>
              <span>
                <input value={estimasiTotalBerat ? `${estimasiTotalBerat} gr` : 0} 
                onChange={(e)=> setEstimasiTotalBerat(e.target.value)} className="input input-sm input-bordered mt-1 w-full" disabled/>
              </span>
            </label>
            </div>
            <hr className="mt-3" />
            <div className="flex justify-end">
            <button
              onClick={()=> setIsModalDeleteDataOpen(true)}
              className="btn btn-sm btn-error mt-2"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              onClick={updateData}
              className="btn btn-sm btn-primary mt-2 ms-2 px-6"
            >
              Edit
            </button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default ModalUpdateData;
