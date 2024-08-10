import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { formatDate } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ModalDeleteData from "../ModalViews/ModalDeleteData";

const HistoryViews = () => {
  const { data: session } = useSession();
  const { getRecordData, deleteAllRecordData } = useDataControllerContext();
  const { recordData, isModalDeleteDataOpen, setIsModalDeleteDataOpen, allDataPart } =
    useStateBasketContext();

  useEffect(() => {
    getRecordData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="border-2 bg-white p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">Riwayat</h1>
            {session?.user.role === "Administrator" ? <button
              onClick={() => setIsModalDeleteDataOpen(true)}
              className="btn btn-sm btn-outline btn-error"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button> : ""}
            
          </div>
          <hr className="mt-2" />
          <table className="table border mt-3">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Operator</th>
                <th className="text-center">Mesin</th>
                <th className="text-center">Nama Part</th>
                <th className="text-center">Jenis NG</th>
                <th className="text-center">Shift</th>
                <th className="text-center">Jumlah</th>
                <th className="text-center">Total Berat (Estimasi)</th>
                <th className="text-center">Total Berat (Aktual)</th>
                <th className="text-center">Tanggal</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recordData.map((item, index) => {
                 const tolerance = weightToleranceFilter(item.data_NG.part);
                 const isOverTolerance = item.data_NG.aktual_berat >=
                 item.data_NG.estimasi_berat + tolerance;
                return (
                  <tr
                    key={item.id}
                    className={isOverTolerance ? "bg-red-600/30" : ""}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center font-semibold">{item.nama}</td>
                    <td className="text-center">{item.mesin}</td>
                    <td className="text-center">{item.data_NG.part}</td>
                    <td className="text-center">{item.data_NG.jenis_NG}</td>
                    <td className="text-center">{item.shift}</td>
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
                      {formatDate(Date(item.date), "dd/MM/yyyy")}
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalDeleteDataOpen && (
        <ModalDeleteData clickFunction={deleteAllRecordData} />
      )}
    </div>
  );
};
export default HistoryViews;
