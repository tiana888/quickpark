import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.css';

const HistoryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const floor = searchParams.get('floor');
  const section = searchParams.get('section');
  const number = parseInt(searchParams.get('number') || '0', 10);
  const [spaceData, setSpaceData] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentStatus, setCurrentStatus] = useState('');
  const goBackToGuardPage = () => {
    navigate('/guardpage'); // 這裡的路徑應該與你的 GuardPage 路徑相匹配
  };

  const calculateParkingDuration = (arrival, departure) => {
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    return (departureDate - arrivalDate) / (1000 * 60 * 60); // 计算小时数
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(number)) {
          setError('數字格式不正確');
          return;
        }

        const queryParams = new URLSearchParams({ floor, section, number }).toString();
        const response = await axios.get(`/api/spaces/all?${queryParams}`);
        setSpaceData(response.data);

        // 更新當前狀態
        if (response.data.length > 0) {
          const latestRecord = response.data[response.data.length - 1];
          if (latestRecord.occupied) {
            const arrivalTime = new Date(latestRecord.arrivalTime);
            const duration = ((new Date() - arrivalTime) / (1000 * 60 * 60)).toFixed(2);
            setCurrentStatus(`當前狀態：使用中，${latestRecord.license}自${latestRecord.arrivalTime}起開始停車，至今已停了${duration}小時`);
          } else {
            setCurrentStatus('當前狀態：空置中');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError('無法加載數據');
      }
    };

    fetchData();
  }, [floor, section, number]);

  // 分頁邏輯
  const totalPages = Math.ceil(spaceData.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  const start = (currentPage - 1) * itemsPerPage;
  const currentData = spaceData.slice(start, start + itemsPerPage);

  return (
    <div className="history-page-container">
      <button onClick={goBackToGuardPage} className="back-button">
        {'<'}
      </button>
      <h1 className="text-xl font-bold text-center">使用歷程</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {!error && spaceData.length === 0 && <p className="text-center">正在加載數據...</p>}
      {spaceData.length > 0 && (
        <>
          <table className="table-auto border-collapse border border-slate-500 mx-auto w-full"> {/* 设置边框和自适应宽度 */}
            <thead>
              <tr>
                <th className="border border-slate-600">抵達時間</th>
                <th className="border border-slate-600">離開時間</th>
                <th className="border border-slate-600">車牌</th>
                <th className="border border-slate-600">停車時數</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-slate-700">{item.arrivalTime}</td>
                  <td className="border border-slate-700">{item.departureTime}</td>
                  <td className="border border-slate-700">{item.license}</td>
                  <td className="border border-slate-700">
                    {calculateParkingDuration(item.arrivalTime, item.departureTime).toFixed(2)} 小時
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container text-center">
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>上一頁</button>
            )}
            {pages}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>下一頁</button>
            )}
          </div>
          <div className="current-status text-center">
            {currentStatus}
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
