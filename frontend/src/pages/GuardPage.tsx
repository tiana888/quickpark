import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from 'react';

import { useAuth } from "@/contexts/AuthContext";
//import NewInput from "@/components/NewInput";
import ProgressBar from "@/components/ProgressBar";
import SearchBar from "@/components/SearchBar";

import {getSpaces} from "@/utils/client";

export type SpaceData = {
  id: string;
  floor: string;
  section: string;
  number: number;
  priority: boolean;
  occupied: boolean;
  license?: string;
  arrivalTime?: Date;
  departureTime?: Date; 
  history: {
    license: string;
    arrivalTime: Date;
    departureTime: Date;
  }[]; 
};

export default function GuardPage() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    // 如果使用者未驗證，則導向errorpage
    if (!user) {
      navigate('/errorpage');
    }
  }, [user, navigate]);
  
  // 使用 setInterval 定期觸發 Get_Space 函數
  useEffect(() => {
    const intervalId = setInterval(() => {
      Get_Space();
    }, 2000);
    // 清除 interval，以防止組件卸載時仍然執行
    return () => clearInterval(intervalId);
  }, []);

  const [B1occupiedRate, setB1occupiedRate] = useState(0);
  const [B2occupiedRate, setB2occupiedRate] = useState(0);
  const [B3occupiedRate, setB3occupiedRate] = useState(0);

  // let B1occupiedRate: number = 0
  // let B2occupiedRate: number = 0
  // let B3occupiedRate: number = 0



  const Get_Space = async () => {
    
    const currentDate: Date = new Date();
    const targetDate: Date = currentDate; 
    const targetYear   : number = currentDate.getFullYear();
    const targetMonth  : number = currentDate.getMonth();
    const targetDay    : number = currentDate.getDate();
    
    const dayStart: Date = targetDate;dayStart.setHours(0, 0, 1, 0);
    const startTime: number = dayStart.getTime();
    const dayEnd: Date  = targetDate;dayEnd.setHours(23, 59, 59, 999);
    const endTime: number = dayEnd.getTime();
  
    //getData
    const result = await getSpaces();
    const allSpaces = result.data;
    console.log(allSpaces);
    //每層樓的車位
    const B1 = allSpaces.slice(0,                    allSpaces.length/3);
    const B2 = allSpaces.slice(allSpaces.length/3,   allSpaces.length/3*2);
    const B3 = allSpaces.slice(allSpaces.length/3*2, allSpaces.length);  
    
    let B1occupiedTime: number = 0;
    B1.forEach((space) => {
      space.history.forEach((spaceHistory) => { 
        let DurationMilliseconds: number = 0        
        const Arr: Date = new Date(spaceHistory.arrivalTime)
        //console.log(Arr)
        const ArrYear : number = Arr.getFullYear();
        const ArrMonth: number = Arr.getMonth();
        const ArrDay  : number = Arr.getDate();
        const ArrTime : number = Arr.getTime();
        //console.log(Arr.getHours(),ArrYear,ArrMonth,ArrDay,ArrTime)
        const Dep: Date = new Date(spaceHistory.departureTime)
        const DepYear : number = Dep.getFullYear();
        const DepMonth: number = Dep.getMonth();
        const DepDay  : number = Dep.getDate();
        const DepTime : number = Dep.getTime();
        //console.log(Dep.getHours(),DepYear,DepMonth,DepDay,DepTime)
        //console.log(targetDate.getHours(),targetYear,targetMonth,targetDay)
        
        //假設今天一月一號
        //找出今天離場的車子
        if(DepDay===targetDay && DepMonth===targetMonth && DepYear===targetYear){
          //case1 他今天入場
          if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
            //那他佔用的時間就是
            DurationMilliseconds = DepTime- ArrTime;
          }
          //case2 非今天入場 用一月一號00.01.00計算
          else{
            DurationMilliseconds = DepTime-startTime;
          }        
        } //上面已經判斷今天離場的，所以剩下今天入場的車子都沒離場．用一月一號23.59.00計算
        else if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
          DurationMilliseconds = endTime-ArrTime;
        }
        B1occupiedTime = B1occupiedTime + DurationMilliseconds/120;
      })
    })


    let B2occupiedTime: number = 0;
    B2.forEach((space) => {
      space.history.forEach((spaceHistory) => { 
        let DurationMilliseconds: number = 0        
        const Arr: Date = new Date(spaceHistory.arrivalTime)
        const ArrYear : number = Arr.getFullYear();
        const ArrMonth: number = Arr.getMonth();
        const ArrDay  : number = Arr.getDate();
        const ArrTime : number = Arr.getTime();
        const Dep: Date = new Date(spaceHistory.departureTime)
        const DepYear : number = Dep.getFullYear();
        const DepMonth: number = Dep.getMonth();
        const DepDay  : number = Dep.getDate();
        const DepTime : number = Dep.getTime();
        //console.log(DepYear,DepMonth,DepDay,DepTime)
        //console.log(targetYear,targetMonth,targetDay,startTime)
        
        if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
          DurationMilliseconds = endTime-ArrTime;
        }
        if(DepDay===targetDay && DepMonth===targetMonth && DepYear===targetYear){
          DurationMilliseconds = DepTime-startTime;
          //console.log(DepTime)
            //console.log(startTime)
        }
        if(DepDay===targetDay && DepMonth===targetMonth && DepYear===targetYear){
          if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
            DurationMilliseconds = DepTime- ArrTime;
          }    
        }
        //console.log(DurationMilliseconds)
        B2occupiedTime = B2occupiedTime + DurationMilliseconds/120;
      })
    })

    let B3occupiedTime: number = 0;
    B3.forEach((space) => {
      space.history.forEach((spaceHistory) => { 
        let DurationMilliseconds: number = 0        
        const Arr: Date = new Date(spaceHistory.arrivalTime)
        const ArrYear : number = Arr.getFullYear();
        const ArrMonth: number = Arr.getMonth();
        const ArrDay  : number = Arr.getDate();
        const ArrTime : number = Arr.getTime();
        const Dep: Date = new Date(spaceHistory.departureTime)
        const DepYear : number = Dep.getFullYear();
        const DepMonth: number = Dep.getMonth();
        const DepDay  : number = Dep.getDate();
        const DepTime : number = Dep.getTime();
        if(DepDay===targetDay && DepMonth===targetMonth && DepYear===targetYear){
          if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
            DurationMilliseconds = DepTime- ArrTime;
          }else{
            DurationMilliseconds = DepTime-startTime;
          }        
        }
        if(ArrDay===targetDay && ArrMonth===targetMonth && ArrYear===targetYear){
          DurationMilliseconds = endTime-ArrTime;
        }
        B3occupiedTime = B3occupiedTime + DurationMilliseconds/120;
      })
    })

    setB1occupiedRate(B1occupiedTime/864000);//一天的秒數＊100
    setB2occupiedRate(B2occupiedTime/864000);//一天的秒數＊100
    setB3occupiedRate(B3occupiedTime/864000);//一天的秒數＊100    
  };





  return (
    <>
      <button onClick={() => navigate('/')} className="back-button">
        {'<返回主頁面'}
      </button>
      <div>GuardPage</div>
      <button className="mx-auto border border-solid border-blue-500 border-2 h-20 w-20 rounded-lg lg:right-10 lg:top-10 lg:h-28 lg:w-28">
        <img
          src="./home_guard.png"
          alt="guard"
        />
      </button>
      <button onClick={Get_Space} className="border-2 border-white">
        Refresh
      </button>
      <div className="mx-auto border rounded-lg w-4/5 gap-4 p-7 m-4">
      <>當日B1使用率</>
      <ProgressBar percentage = {parseFloat(B1occupiedRate.toPrecision(4))} _text = " "/> 
      <>當日B2使用率</>
      <ProgressBar percentage = {parseFloat(B2occupiedRate.toPrecision(4))} _text = " "/> 
      <>當日B3使用率</>
      <ProgressBar percentage = {parseFloat(B3occupiedRate.toPrecision(4))} _text = " "/>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">特定車位搜尋</h1>
        <SearchBar />
      </div>
    </>
  );
}

