import { useDataControllerContext } from "@/context/reza/DataControllerContext";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import { formatDate } from "date-fns";

const { default: Modal } = require("@/components/Modal");

const ModalAddData = () => {
  const {
    part,
    machine,
    jenisNg,
    jumlahNg,
    setJenisNg,
    setJumlahNg,
    setPart,
    shift,
    date,
    setIsModalAddDataOpen,
    estimasiTotalBerat,
    setEstimasiTotalBerat,
    isBtnLoading,
  } = useStateBasketContext();
  const { addData } = useDataControllerContext();

  if (part === "Lowertow") {
    let Lowertow = 0;
    part1 = jumlahNg * 5;
    setEstimasiTotalBerat(Lowertow);
  } else if (part === "Part 2") {
    let part2 = 0;
    part2 = jumlahNg * 10;
    setEstimasiTotalBerat(part2);
  } else if (part === "Part 3") {
    let part3 = 0;
    part3 = jumlahNg * 1000;
    setEstimasiTotalBerat(part3);
  }

  return (
    <Modal
      modalBody={
        <>
          <div className="flex justify-between">
            <h1>Tambah Data</h1>
            <button
              onClick={() => setIsModalAddDataOpen(false)}
              className="me-1 mb-3"
            >
              ✕
            </button>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex justify-between px-1">
              <span className="text-sm font-semibold">
                Mesin : <span className="text-primary">{machine}</span>
              </span>
              <div>
                <span className="text-sm font-semibold">
                  Shift : <span className="text-primary ms-1">{shift}</span>
                </span>
                <span className="text-sm font-semibold ms-3">
                  Date :
                  <span className="text-primary ms-1">
                    {date ? formatDate(new Date(date), "dd/MM/yyyy") : "-"}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label>
                <p className="font-semibold text-sm ms-1">Nama Part :</p>
                <select
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  className="select select-sm select-bordered mt-1 w-full"
                >
                  <option>Pilih Part</option>
                  <option value="Part 1">Lowertow</option>
                  <option value="Part 2">Part 2</option>
                  <option value="Part 3">Part 3</option>
                </select>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jenis NG :</p>
                <span>
                  <select
                    value={jenisNg}
                    onChange={(e) => setJenisNg((e.target.value))}
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
                    value={jumlahNg}
                    onChange={(e) => setJumlahNg(Number(e.target.value))}
                    type="number"
                    className="input input-sm input-bordered mt-1 w-full"
                  />
                </span>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">
                  Estimasi Total Berat :
                </p>
                <span>
                  <input
                    value={estimasiTotalBerat ? `${estimasiTotalBerat} gr` : 0}
                    onChange={(e) => setEstimasiTotalBerat(Number(e.target.value))}
                    type="text"
                    className="input input-sm input-bordered mt-1 w-full"
                    disabled
                  />
                </span>
              </label>
            </div>
            <hr className="mt-3" />
            <button
              onClick={addData}
              className="btn btn-sm btn-primary mt-2 w-full"
              disabled={isBtnLoading}
            >
              {isBtnLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      }
    />
  );
};

export default ModalAddData;
