import { useStateBasketContext } from "@/context/StateBasketContext";
import { useToggleFunctionContext } from "@/context/ToggleFunctionContext";
import {
  faCaretRight,
  faCartArrowDown,
  faClockRotateLeft,
  faCubesStacked,
  faGear,
  faHouse,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { useSession } = require("next-auth/react");

const Sidebar = () => {
  const { data: session } = useSession();
  const {
    isNgProduksiBtnClicked,
    isLaporanNgBtnClicked,
    isNgKeluarBtnClicked,
    isHistoryBtnClicked,
    isDashboardBtnClicked,
    isKelolaPartBtnClicked,
  } = useStateBasketContext();
  const {
    toggleDashboard,
    toggleNgProduksi,
    toggleLaporanNg,
    toggleNgKeluar,
    toggleHistory,
    toggleKelolaPart,
  } = useToggleFunctionContext();

  return (
    <div className="container w-1/5 min-h-screen">
      <div className="min-h-screen bg-blue-600">
        <div className="min-h-24 bg-blue-900 shadow-lg pt-3 pb-2.5 ps-1">
          <div className="w-full ms-1">
            <p className="text-white font-semibold mt-2">
              {session?.user.nama}
            </p>
            <p className="text-white font-semibold underline underline-offset-4 mt-2">
              {session?.user.role}
            </p>
          </div>
        </div>
        <div className="flex items-center min-h-10 text-white font-bold bg-blue-800 shadow-lg ps-2">
          NAVIGATION MENU
        </div>
        <div
          onClick={toggleDashboard}
          className={`flex ${
            isDashboardBtnClicked ? "bg-blue-700" : ""
          } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
        >
          <div className="flex w-full justify-between">
            <div>
              <FontAwesomeIcon icon={faHouse} />
              <span className="ms-2">Dashboard</span>
            </div>
            <div>
              {isDashboardBtnClicked ? (
                <span className="me-4">
                  <FontAwesomeIcon icon={faCaretRight} size="lg" />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-400"/>
        {session?.user.role === "Operator Gudang" ? (
          ""
        ) : (
          <>
            <div
              onClick={toggleNgProduksi}
              className={`flex ${
                isNgProduksiBtnClicked ? "bg-blue-700" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faCubesStacked} />
                  <span className="ms-3">NG Produksi</span>
                </div>
                {isNgProduksiBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
        <hr className="border-gray-400"/>
        {session?.user.role === "Operator Produksi" ? (
          ""
        ) : (
          <>
            <div
              onClick={toggleNgKeluar}
              className={`flex ${
                isNgKeluarBtnClicked ? "bg-blue-700" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faTrashCanArrowUp} />
                  <span className="ms-3">NG Keluar</span>
                </div>
                {isNgKeluarBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border-gray-400"/>
          </>
        )}

        {session?.user.role === "Operator Gudang" ||
        session?.user.role === "Operator Produksi" ? (
          ""
        ) : (
          <>
            <div
              onClick={toggleLaporanNg}
              className={`flex ${
                isLaporanNgBtnClicked ? "bg-blue-700" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  <span className="ms-2">Laporan NG</span>
                </div>
                {isLaporanNgBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border-gray-400"/>
          </>
        )}

        <div
          onClick={toggleHistory}
          className={`flex ${
            isHistoryBtnClicked ? "bg-blue-700" : ""
          } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
        >
          <div className="flex w-full justify-between">
            <div>
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <span className="ms-2">Record Data</span>
            </div>
            {isHistoryBtnClicked ? (
              <span className="me-4">
                <FontAwesomeIcon icon={faCaretRight} size="lg" />
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <hr className="border-gray-400"/>

        {session?.user.role === "Administrator" ? (
          <>
            <div
              onClick={toggleKelolaPart}
              className={`flex ${
                isKelolaPartBtnClicked ? "bg-blue-700" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faGear} />
                  <span className="ms-2">Kelola Part</span>
                </div>
                {isKelolaPartBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr className="border-gray-400"/>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Sidebar;
