import { useState } from "react";

import ClientInput from "@/components/ClientInput";
import Floor from "@/components/Floor";
import HeaderBar from "@/components/HeaderBar";

/* eslint-disable no-console */
export default function ClientPage() {
  const [activeFloor, setActiveFloor] = useState(1); // 1, 2, 或 3
  const translateXValue = `-${(activeFloor - 1) * 100}vw`;
  const handleFloorChange = (to: number) => {
    setActiveFloor(to);
  };

  return (
    <>
      <HeaderBar />
      <div className="mb-2 w-[100vw] justify-center rounded-lg  px-[70px]">
        <ClientInput placeholder="請輸入車牌號碼" />
        <div
          style={{
            top: "150%",
            left: "0",
            transform: "translate(0, -50%)",
            width: "25%",
            height: "25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div className="mt-2 flex items-center justify-center">
          <img src="/ColorBar.png" alt="color" />
        </div>
        <div className="text-center text-3xl">{`B${activeFloor}`}</div>
      </div>

      {/* Grid items */}
      <div className="overflow-x-hidden">
        <div
          className={`flex w-[300vw]`}
          style={{
            transform: `translateX(${translateXValue})`,
            transition: "transform 0.5s ease",
          }}
        >
          <div className="">
            <Floor floor="B1" handleFloorChange={handleFloorChange} />
          </div>
          <div className="">
            <Floor floor="B2" handleFloorChange={handleFloorChange} />
          </div>
          <div className="">
            <Floor floor="B3" handleFloorChange={handleFloorChange} />
          </div>
        </div>
      </div>
      <div
        className="float-up m-4 flex justify-center text-2xl"
        style={{ fontFamily: "微軟正黑體" }}
      >
        點擊區域查看空位
      </div>
    </>
  );
}
