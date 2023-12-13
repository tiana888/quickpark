import HeaderBar from "@/components/HeaderBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    // 如果使用者未驗證，則導向errorpage
    if (!user) {
      navigate('/errorpage');
    }
  }, [user, navigate]);
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

