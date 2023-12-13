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
    <>
      <HeaderBar />
      <div>HistoryPage</div>
    </>
  );
}
