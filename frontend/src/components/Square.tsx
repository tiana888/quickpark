import { useState } from "react";

import { GetSpaceResponse } from "@lib/shared_types";
import { Button } from "@mui/material";

import { updateSpace } from "@/utils/client";

export default function Square({
  floor,
  section,
  number,
  priority,
  occupied,
  license,
  arrivalTime,
  departureTime,
  history,
}: Omit<GetSpaceResponse, "id">) {
  const isNumberOnRight = number <= 10;
  const isSingle = number < 10;

  const randomLicense = async () => {
    const letterCount = 3;
    const numberCount = 4;
  
    const letters = Array.from({ length: letterCount }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    
    const numbers = Array.from({ length: numberCount }, () =>
      String.fromCharCode(48 + Math.floor(Math.random() * 10))
    ).join('');
    return letters + numbers;
  }
	const handleClick = async()=>{
    const now = new Date();
    if(!occupied){
      const newLicense = await randomLicense();
      await updateSpace( 
        floor, section, number,
        {
          license: newLicense, 
          arrivalTime: now,
        }
      );
    }
    else{
      if(!arrivalTime || !license) return;
      await updateSpace( 
        floor,section,number,
        {
          history: [...history,{license:license, arrivalTime: arrivalTime, departureTime: now}]
        }
      );
      await updateSpace( 
        floor,section,number,
        {
          license: "",
          arrivalTime: undefined
        }
      );
    }
    await updateSpace( floor,section,number,{occupied: !occupied})
	}
  return (
    <div className="parking-lot" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="flex-1 flex relative content-center" onClick={handleClick}>
        <Button>
          <div className="flex border-2 border-white" style={{ width: '30vw', height: '15vw', maxWidth: '200px', maxHeight: '100px', justifyContent: 'center', alignItems: 'center' }}>
            {priority && (
              <img
                src="/priority.png"
                alt="priority parking"
                className="absolute w-6/12 h-6/12 object-contain z-0"
              />
            )}
            {occupied ? (
              <img
                src="/car.png"
                alt="car"
                className="absolute w-full h-full object-contain"
                style={{
                  transform: isNumberOnRight ? "rotate(90deg)" : "rotate(270deg)",
                }}
              />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        </Button>
        <span className="number-label text-white font-bold absolute"
          style={{
            top: '50%',
            left: isNumberOnRight ? 'calc(100% + 2px)' : undefined, 
            right: isNumberOnRight ? undefined : 'calc(100% + 2px)', 
            transform: 'translateY(-50%)',
            zIndex: 10,
            fontSize: '5vw',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          {isSingle ? `0${number}` : number}
        </span>
        </div>
  </div>
  );
}
