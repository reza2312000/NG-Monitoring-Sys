import { useDataControllerContext } from "@/context/DataControllerContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Charts from "@/components/Charts";
import Footer from "@/components/Footer";

const DashboardViews = () => {
  const { data: session } = useSession();
  const { getAllData, getDataTotal } = useDataControllerContext();

  useEffect(() => {
    getAllData();
    getDataTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  const monthIndex = new Date().getMonth();
  const monthName = months[monthIndex];

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="bg-white border-2 rounded-lg p-3">
          <h1 className="font-bold text-center">GRAFIK JUMLAH TOTAL NG</h1>
        </div>
        <div className="border-2 bg-white rounded-lg p-2 mt-1">
          <Charts />
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default DashboardViews;
