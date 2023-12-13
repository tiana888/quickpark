import { useNavigate } from "react-router-dom";

import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
import ProgressBar from "@/components/ProgressBar";

export default function GuardPage() {
  const navigate = useNavigate();

  function showAlert(message: string) {
    window.alert(message);
  }
  const handleClick = (password?: string) => {
    if (!password) {
      const message = "請輸入車位";
      showAlert(message);
      return;
    }
    if (password == "1234") {
      //TODO:
      navigate("/guardpage/HistoryPage/" + password);
      return;
    } else {
      const message = "查無車位，請重新輸入";
      showAlert(message);
      return;
    }
  };
  return (
    <>
      <HeaderBar />
      <div>GuardPage</div>
      <button className="mx-auto h-20 w-20 rounded-lg border border-2 border-solid border-blue-500 lg:right-10 lg:top-10 lg:h-28 lg:w-28">
        <img src="./home_guard.png" alt="guard" />
      </button>
      <div className="m-4 mx-auto w-4/5 gap-4 rounded-lg border p-7">
        <>當前使用率</>
        <ProgressBar percentage={50} _text=" " />
        <>當日使用率</>
        <ProgressBar percentage={87} _text=" 今天天氣真好" />
      </div>
      <div className="mx-auto w-4/5 rounded-lg border">
        <NewInput
          placeholder="請輸入查詢的車位(預設只有1234)"
          onClick={handleClick}
        />
      </div>
    </>
  );
}
