import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";

import HomeInput from "@/components/HomeInput";
import { useAuth } from "@/contexts/AuthContext";
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import '../styles.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { login,user } = useAuth();
  const [DialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => {
    if (!user){
      setDialogOpen(true);
    }else{
      navigate('/guardpage');
    }
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  function showAlert(message: string) {
    window.alert(message);
  }
  const handleClick = async (username?: string, password?: string) => {
    if (!username) {
      const message = "請輸入認證帳號";
      showAlert(message);
      return;
    }
    if (!password) {
      const message = "請輸入認證密碼";
      showAlert(message);
      return;
    }

    try{
      await login(username, password);
      navigate('/guardpage');
    } catch (error) {
      // Handle authentication failure
      const message = '帳號或密碼錯誤，請重新輸入';
      showAlert(message);
      navigate('/');
      setDialogOpen(true);
    } finally {
      setDialogOpen(false);
    }
    setDialogOpen(false);
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="left" ref={ref} {...props} timeout={{ enter: 500, exit: 500 }} />;
  });

  return (
    <main className="max-w-screen container max-h-screen">
      <button
        className="absolute right-0 top-0 h-20 w-20 lg:right-10 lg:top-10 lg:h-28 lg:w-28"
        onClick={handleOpen}
      >
        <img src="./home_guard.png" alt="guard" className="flip-left" />
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
            {/* <img className="ml-20 h-[100px] w-[100px]" src="./home_P.png" alt="P" /> */}
            <img className="ml-20 h-[142px] w-[261px]" src="./home_car.gif" alt="car" />
          </div>

          {/* 在非 lg 尺寸下顯示的元素 */}
          <h1 className="text-6xl lg:hidden">Quick</h1>
          <h1 className="text-6xl lg:hidden">Parking</h1>
            <img
              className="lg:hidden mt-16 ml-16 h-[142px] w-[261px]"
              src="./home_car.gif"
              alt="car"
            />

          <img
            className="mt-20 h-24 w-72 lg:h-40 lg:w-6/12 flicker-animation"
            src="./home_qp.png"
            alt="word: quick park"
          />
        </div>
      </Link>
      <Dialog open={DialogOpen} onClose={handleClose} TransitionComponent={Transition}>
        <HomeInput onClick={handleClick} />
      </Dialog>
    </main>
  );
}
