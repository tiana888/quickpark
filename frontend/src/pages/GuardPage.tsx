import HeaderBar from "@/components/HeaderBar";
//import NewInput from "@/components/NewInput";
import ProgressBar from "@/components/ProgressBar";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from 'react-router-dom';

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
  const targetDate = currentDate; 
  const dayStart = targetDate;
        dayStart.setHours(0, 0, 1, 0);
  const dayEnd  = targetDate;
        dayEnd.setHours(23, 59, 59, 999);

  let B1occupiedRate = 0
  let B2occupiedRate = 0
  let B3occupiedRate = 0
  const Get_Space = async () => {
    const result = getSpaces();
    const allSpaces = (await result).data;
    console.log(allSpaces);
    //每層樓的車位
    const B1 = allSpaces.slice(0,                    allSpaces.length/3);
    const B2 = allSpaces.slice(allSpaces.length/3,   allSpaces.length/3*2);
    const B3 = allSpaces.slice(allSpaces.length/3*2, allSpaces.length);  
    // B1.forEach((space, index) => {
    //   // 在这里执行对每个 Space 对象的操作
    //   console.log(`Space ${index + 1}:`, space);
    // });

    let B1occupiedTime = 0;
    B1.forEach((space) => {
      space.history.forEach((spaceHistory) => {   
        let DurationMilliseconds = 0        
        const Arr = spaceHistory.arrivalTime
        const Dep = spaceHistory.departureTime    
        //假設今天一月一號
        //找出今天離場的車子
        if(Dep.getDate===targetDate.getDate && Dep.getMonth===targetDate.getMonth && Dep.getFullYear==targetDate.getFullYear){
          //case1 他今天入場
          if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
            //那他佔用的時間就是
            DurationMilliseconds = Dep.getTime()- Arr.getTime();
          }//case2 非今天入場 用一月一號00.01.00計算
          else{
            DurationMilliseconds = Dep.getTime()-dayStart.getTime();
          }        
        }
        //上面已經判斷今天離場的，所以剩下今天入場的車子都沒離場．用一月一號23.59.00計算
        if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
          DurationMilliseconds = dayEnd.getTime()-Arr.getTime();
        }
        B1occupiedTime = B1occupiedTime + DurationMilliseconds;
      })
    })
    B1occupiedRate = B1occupiedTime/864000//一天的秒數＊100
    
    let B2occupiedTime = 0;
    B2.forEach((space) => {
      space.history.forEach((spaceHistory) => {   
        let DurationMilliseconds = 0        
        const Arr = spaceHistory.arrivalTime
        const Dep = spaceHistory.departureTime    
        //假設今天一月一號
        //找出今天離場的車子
        if(Dep.getDate===targetDate.getDate && Dep.getMonth===targetDate.getMonth && Dep.getFullYear==targetDate.getFullYear){
          //case1 他今天入場
          if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
            //那他佔用的時間就是
            DurationMilliseconds = Dep.getTime()- Arr.getTime();
          }//case2 非今天入場 用一月一號00.01.00計算
          else{
            DurationMilliseconds = Dep.getTime()-dayStart.getTime();
          }        
        }
        //上面已經判斷今天離場的，所以剩下今天入場的車子都沒離場．用一月一號23.59.00計算
        if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
          DurationMilliseconds = dayEnd.getTime()-Arr.getTime();
        }
        B2occupiedTime = B2occupiedTime + DurationMilliseconds;
      })
    })
    B2occupiedRate = B2occupiedTime/864000//一天的秒數＊100
    
    let B3occupiedTime = 0;
    B3.forEach((space) => {
      space.history.forEach((spaceHistory) => {   
        let DurationMilliseconds = 0        
        const Arr = spaceHistory.arrivalTime
        const Dep = spaceHistory.departureTime    
        if(Dep.getDate===targetDate.getDate && Dep.getMonth===targetDate.getMonth && Dep.getFullYear==targetDate.getFullYear){
          if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
            DurationMilliseconds = Dep.getTime()- Arr.getTime();
          }
          else{
            DurationMilliseconds = Dep.getTime()-dayStart.getTime();
          }        
        }
        if(Arr.getDate===targetDate.getDate && Arr.getMonth===targetDate.getMonth && Arr.getFullYear==targetDate.getFullYear){
          DurationMilliseconds = dayEnd.getTime()-Arr.getTime();
        }
        B3occupiedTime = B3occupiedTime + DurationMilliseconds;
      })
    })
    B3occupiedRate = B3occupiedTime/864000//一天的秒數＊100
    console.log(B1occupiedRate);
    console.log(B2occupiedRate);
    console.log(B3occupiedRate);
  //   const result2 = await getSpace("B1", "A", 1);
  //   const numberOfIterations = result2.data.floor;
  //   console.log(numberOfIterations);
  //   console.log(result);
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
      <>當前使用率</>
      <ProgressBar percentage = {50} _text = " "/> 
      <>當日B1使用率</>
      <ProgressBar percentage = {B1occupiedRate} _text = " "/> 
      <>當日B2使用率</>
      <ProgressBar percentage = {B2occupiedRate} _text = " "/> 
      <>當日B3使用率</>
      <ProgressBar percentage = {B3occupiedRate} _text = " "/>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">特定車位搜尋</h1>
        <SearchBar />
      </div>
    </>
  );
}