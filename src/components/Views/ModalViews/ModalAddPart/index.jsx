import Modal from "@/components/Modal";
import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";
import { useEffect } from "react";

const ModalAddPart = () => {
  const {
    setIsModalAddPartOpen,
    kodePart,
    namaPart,
    estimasiBeratPart,
    setKodePart,
    setNamaPart,
    setEstimasiBeratPart,
    weightTolerance, 
    setWeightTolerance
  } = useStateBasketContext();

  const { addPart } = useDataControllerContext()

  return (
    <Modal
      modalBody={
        <>
          <div className="flex justify-between">
            <h1>Tambah Part</h1>
            <button
              onClick={() => setIsModalAddPartOpen(false)}
              className="me-1 mb-3"
            >
              ✕
            </button>
          </div>
          <hr />
          <form onSubmit={addPart}>
            <div className="mt-2">
              <div className="mt-4">
                <label>
                  <p className="font-semibold text-sm ms-1">Kode Part :</p>
                  <input
                    value={kodePart}
                    onChange={(e) => setKodePart(e.target.value)}
                    className="input input-sm input-bordered w-full mt-1"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  <p className="font-semibold text-sm ms-1">Nama Part :</p>
                  <input
                    value={namaPart}
                    onChange={(e) => setNamaPart(e.target.value)}
                    className="input input-sm input-bordered w-full mt-1"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  <p className="font-semibold text-sm ms-1">
                    Estimasi Berat (gr) :
                  </p>
                  <input
                    value={estimasiBeratPart}
                    onChange={(e) => setEstimasiBeratPart(e.target.value == "" ? "" : Number(e.target.value))}
                    type="number"
                    className="input input-sm input-bordered w-full mt-1"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  <p className="font-semibold text-sm ms-1">
                    Toleransi Berat Aktual (gr) :
                  </p>
                  <input
                    value={weightTolerance}
                    onChange={(e) => setWeightTolerance(e.target.value == "" ? "" : Number(e.target.value))}
                    type="number"
                    className="input input-sm input-bordered w-full mt-1"
                  />
                </label>
              </div>
              <hr className="mt-3" />
              <button type="submit" className="btn btn-sm btn-primary mt-2 w-full">
                Simpan
              </button>
            </div>
          </form>
        </>
      }
    />
  );
};

export default ModalAddPart;
