import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import type { SpaceData } from "@lib/shared_types";

import { getSpace } from "@/utils/client";

import "./HistoryPage.css";

type history = {
  license: string;
  arrivalTime?: Date;
  departureTime?: Date;
}[];

const HistoryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const floor = searchParams.get("floor");
  const section = searchParams.get("section");
  const number = searchParams.get("number");
  const [spaceData, setSpaceData] = useState<history>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentStatus, setCurrentStatus] = useState("");
  const [space, setSpace] = useState<SpaceData>();
  const updateCurrentStatus = useCallback((data: SpaceData) => {
    if (data.occupied && data.arrivalTime && data.license) {
      const duration = calculateParkingDuration(data.arrivalTime, new Date());
      const parts = data.license.match(/[A-Z]+|\d+/g);
      if (!parts) return;
      const formattedLicense = parts.join("-");
      setCurrentStatus(
        `${formattedLicense} 自 ${new Date(
          data.arrivalTime,
        ).toLocaleString()} 起開始停車，至今已停了 ${duration} 小時`,
      );
    } else {
      setCurrentStatus("當前狀態：空置中");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!floor || !section || !number) return;
      setError("");
      if (isNaN(Number(number))) {
        setError("數字格式不正確");
        return;
      }

      try {
        const response = await getSpace(floor, section, Number(number));
        const data = response.data;
        setSpace(data);
        if (data && data.history.length > 0) {
          setSpaceData(data.history);
          updateCurrentStatus(data);
        } else {
          setError("暫無數據");
        }
      } catch (fetchError) {
        setError("無法加載數據");
      }
    };

    fetchData();
  }, [floor, section, number, updateCurrentStatus]);

  const calculateParkingDuration = (arrival: Date, departure: Date) => {
    const arrivalDate = new Date(arrival);
    const departureDate = departure ? new Date(departure) : new Date();
    return (
      (Number(departureDate) - Number(arrivalDate)) /
      (1000 * 60 * 60)
    ).toFixed(2);
  };

  const totalPages = Math.ceil(spaceData.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>,
    );
  }

  const currentData = spaceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="history-page-container">
      <button onClick={() => navigate("/guardpage")} className="back-button">
        {"<返回警衛頁面"}
      </button>
      <div className="mb-4 flex justify-center">
        <span className="mx-2 text-lg">樓層: {floor}</span>
        <span className="mx-2 text-lg">區域: {section}</span>
        <span className="mx-2 text-lg">車位: {number}</span>
      </div>
      {space?.occupied ? (
        <div
          className="text-center"
          style={{ fontSize: "1.2em", fontWeight: "bold", color: "white" }}
        >
          當前狀態：使用中
        </div>
      ) : (
        <div />
      )}
      <div className="current-status text-center">{currentStatus}</div>
      <h1 className="text-center text-xl font-bold">使用歷程</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {!error && spaceData.length > 0 && (
        <>
          <table className="border-slate-500 mx-auto w-full table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border-slate-600 border">抵達時間</th>
                <th className="border-slate-600 border">離開時間</th>
                <th className="border-slate-600 border">車牌</th>
                <th className="border-slate-600 border">停車時數</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((record, index) => (
                <tr key={index} className="text-center">
                  <td className="border-slate-700 border">
                    {record.arrivalTime
                      ? new Date(record.arrivalTime).toLocaleString()
                      : ""}
                  </td>
                  <td className="border-slate-700 border">
                    {record.departureTime
                      ? new Date(record.departureTime).toLocaleString()
                      : "仍在停車"}
                  </td>
                  <td className="border-slate-700 border">{record.license}</td>
                  <td className="border-slate-700 border">
                    {calculateParkingDuration(
                      record.arrivalTime ?? new Date(),
                      record.departureTime ?? new Date(),
                    )}{" "}
                    小時
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container text-center">
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>
                上一頁
              </button>
            )}
            {pages}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                下一頁
              </button>
            )}
          </div>
        </>
      )}
      {!error && spaceData.length === 0 && (
        <p className="text-center">暫無數據</p>
      )}
    </div>
  );
};

export default HistoryPage;
