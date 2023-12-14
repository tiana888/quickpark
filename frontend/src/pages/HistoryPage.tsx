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

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      if (isNaN(number)) {
        setError('數字格式不正確');
        return;
      }

      const queryParams = new URLSearchParams({ floor, section, number }).toString();
      try {
        const response = await axios.get(`/api/spaces/all?${queryParams}`);
        const data = response.data[0];
        if (data && data.history.length > 0) {
          setSpaceData(data.history);
          updateCurrentStatus(data);
        } else {
          setError('暫無數據');
        }
      } catch (fetchError) {
        setError('無法加載數據');
      }
    };

    fetchData();
  }, [floor, section, number]);

  const calculateParkingDuration = (arrival, departure) => {
    const arrivalDate = new Date(arrival);
    const departureDate = departure ? new Date(departure) : new Date();
    return ((departureDate - arrivalDate) / (1000 * 60 * 60)).toFixed(2);
  };

  const updateCurrentStatus = (data) => {
    if (data.occupied) {
      const duration = calculateParkingDuration(data.arrivalTime, new Date());
      setCurrentStatus(`當前狀態：使用中，${data.license}自${data.arrivalTime}起開始停車，至今已停了${duration}小時`);
    } else {
      setCurrentStatus('當前狀態：空置中');
    }
  };

  const totalPages = Math.ceil(spaceData.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  const currentData = spaceData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="history-page-container">
      <button onClick={() => navigate('/guardpage')} className="back-button">
        {'<返回警衛頁面'}
      </button>
      <div className="current-status text-center">{currentStatus}</div>
      <h1 className="text-xl font-bold text-center">使用歷程</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {!error && spaceData.length > 0 && (
        <>
          <table className="table-auto border-collapse border border-slate-500 mx-auto w-full">
            <thead>
              <tr>
                <th className="border border-slate-600">抵達時間</th>
                <th className="border border-slate-600">離開時間</th>
                <th className="border border-slate-600">車牌</th>
                <th className="border border-slate-600">停車時數</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((record, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-slate-700">{new Date(record.arrivalTime).toLocaleString()}</td>
                  <td className="border border-slate-700">{record.departureTime ? new Date(record.departureTime).toLocaleString() : '仍在停車'}</td>
                  <td className="border border-slate-700">{record.license}</td>
                  <td className="border border-slate-700">
                    {calculateParkingDuration(record.arrivalTime, record.departureTime)} 小時
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
        </>
      )}
      {!error && spaceData.length === 0 && <p className="text-center">暫無數據</p>}
    </div>
  );
};

export default HistoryPage;
