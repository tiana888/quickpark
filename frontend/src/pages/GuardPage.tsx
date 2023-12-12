import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
import ProgressBar from "@/components/ProgressBar";
import { useNavigate } from 'react-router-dom';

export default function GuardPage() {
  const navigate = useNavigate();
  
  function showAlert(message:string) {
    window.alert(message);
  }
  const handleClick = (password?:string) => {
    if (!password) {
      const message = "請輸入車位"
      showAlert(message)
      return;
    } 
    if (password == "1234"){
      //TODO:
      navigate('/guardpage/HistoryPage/'+ password);
      return;
    }else{
      const message = "查無車位，請重新輸入"
      showAlert(message)
      return;
    }
  };
  return (
    <>
      <HeaderBar />
      <div>GuardPage</div>
      <button className="mx-auto border border-solid border-blue-500 border-2 h-20 w-20 rounded-lg lg:right-10 lg:top-10 lg:h-28 lg:w-28">
        <img
          src="./home_guard.png"
          alt="guard"
        />
      </button>
      <div className="mx-auto border rounded-lg w-4/5 gap-4 p-7 m-4">
      <>當前使用率</>
      <ProgressBar percentage = {50} _text = " "/> 
      <>當日使用率</>
      <ProgressBar percentage = {87} _text = " 今天天氣真好"/>
      </div>
      <div className="mx-auto border rounded-lg w-4/5">
      <NewInput
          placeholder="請輸入查詢的車位(預設只有1234)"
          onClick={handleClick}
        />
      </div>     

      
      
    </>
  );
}
