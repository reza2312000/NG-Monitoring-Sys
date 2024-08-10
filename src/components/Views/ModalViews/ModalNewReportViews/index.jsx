import Modal from "@/components/Modal";
import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";

const ModalNewReport = () => {
  const { setIsModalNewReportOpen, isBtnLoading } = useStateBasketContext();
  const { newReport } = useDataControllerContext();
  return (
    <>
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalNewReportOpen(false)}
                className="me-1 mb-3"
              >
                ✕
              </button>
            </div>
            <hr className="mb-2"/>
            <div className="p-2">
              <h1 className="text-center">Anda yakin ingin membuat laporan baru?</h1>
              <h1 className="font-semibold text-center mt-4 italic">*Data sebelumnya akan masuk ke riwayat!</h1>
            </div>
            <hr className="mt-2"/>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalNewReportOpen(false)}
                  className="btn btn-sm bg-blue-700 text-white"
                >
                  Tidak
                </button>
                <button
                  onClick={newReport}
                  className="btn btn-sm btn-error ms-2"
                  disabled={isBtnLoading}
                >
                  {isBtnLoading ? "Loading..." : "Ya"}
                </button>
              </div>
          </>
        }
      />
    </>
  );
};
export default ModalNewReport;
