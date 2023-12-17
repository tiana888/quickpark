import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 在 Error 頁面停留 3 秒後再導向首頁
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // 清理計時器以避免內存洩漏
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <p>發生錯誤，請稍後再試。</p>
    </div>
  );
}
