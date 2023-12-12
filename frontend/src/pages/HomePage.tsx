import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";

import NewInput from "@/components/NewInput";

export default function HomePage() {
  const navigate = useNavigate();
  const [DialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  function showAlert(message: string) {
    window.alert(message);
  }
  const handleClick = (password?: string) => {
    if (!password) {
      const message = "請輸入認證密碼";
      showAlert(message);
      return;
    }
    if (password === "123") {
      navigate("/guardpage");
    } else {
      const message = "密碼錯誤，請重新輸入密碼";
      showAlert(message);
      return;
    }
    setDialogOpen(false);
  };

  return (
    <main className="max-w-screen container max-h-screen">
      <button
        className="absolute right-0 top-0 h-20 w-20 lg:right-10 lg:top-10 lg:h-28 lg:w-28"
        onClick={handleOpen}
      >
        <img src="./home_guard.png" alt="guard" />
      </button>
      <Link to="/clientpage">
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          {/* 在 lg 尺寸下顯示的元素 */}
          <div className="hidden lg:-mb-20 lg:mt-10 lg:block lg:flex lg:flex-row lg:items-center">
            <div className="mr-20">
              <span className="text-7xl">Quick</span>
              <br />
              <span className="ml-20 text-7xl">Parking</span>
            </div>
            <img className="ml-20 h-48 w-64" src="./home_car.png" alt="car" />
          </div>

          {/* 在非 lg 尺寸下顯示的元素 */}
          <h1 className="text-6xl lg:hidden">Quick</h1>
          <h1 className="text-6xl lg:hidden">Parking</h1>
          <img
            className="mt-16 h-36 w-52 lg:hidden"
            src="./home_car.png"
            alt="car"
          />

          <img
            className="mt-20 h-24 w-72 lg:h-40 lg:w-6/12"
            src="./home_qp.png"
            alt="word: quick park"
          />
        </div>
      </Link>
      <Dialog open={DialogOpen} onClose={handleClose}>
        <NewInput placeholder="請輸入密碼" onClick={handleClick} />
      </Dialog>
    </main>
  );
}
