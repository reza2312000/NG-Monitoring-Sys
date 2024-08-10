import Sidebar from "@/components/Sidebar";
import DashboardViews from "@/components/Views/DashboardViews";
import HistoryViews from "@/components/Views/HistoryViews";
import KelolaPartViews from "@/components/Views/KelolaPartViews";
import NgKeluarViews from "@/components/Views/NgKeluarViews";
import LaporanNgViews from "@/components/Views/LaporanNgViews";
import NgProduksiViews from "@/components/Views/NgProduksiViews";
import { useStateBasketContext } from "@/context/StateBasketContext";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    isDashboardBtnClicked,
    isLaporanNgBtnClicked,
    isNgProduksiBtnClicked,
    isNgKeluarBtnClicked,
    isHistoryBtnClicked,
    isKelolaPartBtnClicked,
  } = useStateBasketContext();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth/login");
      }
    };
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex">
      <Sidebar />
      {isDashboardBtnClicked ? (
        <DashboardViews />
      ) : isLaporanNgBtnClicked ? (
        <LaporanNgViews />
      ) : isNgProduksiBtnClicked ? (
        <NgProduksiViews />
      ) : isNgKeluarBtnClicked ? (
        <NgKeluarViews />
      ) : isHistoryBtnClicked ? (
        <HistoryViews />
      ) : isKelolaPartBtnClicked ? (
        <KelolaPartViews />
      ) : (
        ""
      )}
    </div>
  );
};
export default Dashboard;
