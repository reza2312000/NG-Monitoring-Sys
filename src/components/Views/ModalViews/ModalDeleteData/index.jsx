import Modal from "@/components/Modal";
import { useDataControllerContext } from "@/context/DataControllerContext";
import { useStateBasketContext } from "@/context/StateBasketContext";

const ModalDeleteData = (props) => {
  const { setIsModalDeleteDataOpen, isBtnLoading } = useStateBasketContext();
  return (
    <>
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalDeleteDataOpen(false)}
                className="me-1 mb-3"
              >
                ✕
              </button>
            </div>
            <div className="p-2">
              <p>Anda yakin ingin menghapus data?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalDeleteDataOpen(false)}
                  className="btn btn-sm bg-blue-700 text-white"
                >
                  Tidak
                </button>
                <button
                  onClick={props.clickFunction}
                  className="btn btn-sm btn-error ms-2"
                  disabled={isBtnLoading}
                >
                  {isBtnLoading ? "Deleting..." : "Ya"}
                </button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};
export default ModalDeleteData;
