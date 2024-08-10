import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";
import { formatDate } from "date-fns";

const { default: Modal } = require("@/components/Modal");

const ModalChangeStatus = () => {
  const {
    selectedPart,
    selectedJenisNg,
    selectedJumlahNg,
    selectedEstimasiBerat,
    selectedShift,
    selectedDate,
    setIsModalChangeStatusOpen,
    isBtnLoading,
    selectedActualBerat,
    status, 
    setStatus
  } = useStateBasketContext();
  const { updateStatus } = useDataControllerContext();

  return (
    <Modal
      modalBody={
        <>
          <div className="flex justify-between">
            <h1>Tambah Data</h1>
            <button
              onClick={() => setIsModalChangeStatusOpen(false)}
              className="me-1 mb-3"
            >
              ✕
            </button>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex justify-between px-1">
              <span className="text-sm font-semibold">
                Shift : <span className="text-primary">{selectedShift}</span>
              </span>
              <span className="text-sm font-semibold">
                Date :{" "}
                <span className="text-primary">
                  {formatDate(Date(selectedDate), "dd/MM/yyyy")}
                </span>
              </span>
            </div>
            <div className="mt-4">
              <label>
                <p className="font-semibold text-sm ms-1">Nama Part :</p>
                <input
                  value={selectedPart}
                  className="input input-sm input-bordered w-full mt-1"
                  disabled
                />
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jenis NG :</p>
                <input
                  value={selectedJenisNg}
                  className="input input-sm input-bordered w-full mt-1"
                  disabled
                />
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jumlah NG :</p>
                <span>
                  <input
                    value={selectedJumlahNg}
                    type="number"
                    className="input input-sm input-bordered mt-1 w-full"
                    disabled
                  />
                </span>
              </label>
              <div className="flex">
                <div className="w-1/2 me-1">
                  <label className="flex flex-col mt-3">
                    <p className="font-semibold text-sm ms-1">
                      Estimasi Total Berat :
                    </p>
                    <span>
                      <input
                        value={
                          selectedEstimasiBerat ? `${selectedEstimasiBerat} gr` : 0
                        }
                        type="text"
                        className="input input-sm input-bordered mt-1 w-full"
                        disabled
                      />
                    </span>
                  </label>
                </div>
                <div className="w-1/2 ms-1">
                  <label className="flex flex-col mt-3">
                    <p className="font-semibold text-sm ms-1">
                      Aktual Total Berat :
                    </p>
                    <span>
                      <input
                        value={selectedActualBerat ? `${selectedActualBerat} gr` : "-"}
                        type="text"
                        className="input input-sm input-bordered input-primary mt-1 w-full"
                        disabled
                      />
                    </span>
                  </label>
                </div>
              </div>
                  <select value={status} onChange={(e)=> setStatus(e.target.value)} className="select select-sm select-bordered w-full mt-3">
                    <option >Pilih Status</option>
                    <option value={"ACC"}>ACC</option>
                    <option value={"Disapprove"}>Disapprove</option>
                  </select>
            </div>
            <hr className="mt-3" />
            <button
              onClick={updateStatus}
              className="btn btn-sm btn-primary mt-2 w-full"
              disabled={isBtnLoading}
            >
              {isBtnLoading ? "Submitting..." : "Ubah Status"}
            </button>
          </div>
        </>
      }
    />
  );
};

export default ModalChangeStatus
