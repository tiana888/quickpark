import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const HistoryPage = () => {
  const [searchParams] = useSearchParams();
  const floor = searchParams.get('floor');
  const section = searchParams.get('section');
  const number = searchParams.get('number');
  const [spaceData, setSpaceData] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({ floor, section, number }).toString();
        const response = await axios.get(`/api/space/all?${queryParams}`); // 从后端获取所有数据
        setSpaceData(response.data);
      } catch (error) {
        if (error.response) {
          setError('未存在相符資料');
        } else if (error.request) {
          setError('當前未正常連接 MongoDB');
        } else {
          setError('發生錯誤');
        }
      }
    };

    fetchData();
  }, [floor, section, number]);

  const renderPagination = () => {
    const totalPages = Math.ceil(spaceData.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return <div>{pages}</div>;
  };

  const currentData = spaceData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Space Usage History</h1>
      {error && <p>{error}</p>}
      {!error && spaceData.length === 0 && <p>正在加載數據...</p>}
      {spaceData.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>抵達時間</th>
                <th>離開時間</th>
                <th>車牌</th>
                <th>停車時數</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.arrivalTime}</td>
                  <td>{item.departureTime}</td>
                  <td>{item.license}</td>
                  <td>{/* 計算停車時數 */}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default HistoryPage;
