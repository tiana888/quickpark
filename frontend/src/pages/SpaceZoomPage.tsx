import HeaderBar from "@/components/HeaderBar";
import { Button, Input } from "@mui/material"
import { getSpaces, createSpace,getSection } from "@/utils/client";
import Square from "@/components/Square";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { GetSpacesResponse } from "@lib/shared_types";

export default function SpaceZoomPage() {
  
  const [spaces, setSpaces] = useState<GetSpacesResponse>([])
  const remainingSpaces = spaces.filter(space => space.number <= 20 && !space.occupied);
  const { floor, section } = useParams();

  const fetchSpace = async() => {
    try{
    if(!floor || !section) return;
    const response = await getSection(floor, section);
    const spacesData = response.data;
    setSpaces(spacesData);
    }finally{
      console.log(spaces);
    }
  }

  useEffect(()=>{
    fetchSpace();
  });
  // })
  // useEffect(()=>{
  //   fetchSpace();
  // });
  // useEffect(() => {
  //   if(!floor || !section) return;
  //   spaces = getSection(floor ,section);
  // });

  return (
    <>
      <HeaderBar />

      {/* <Button onClick={}>INIT</Button> */}

      <div className="ml-10 ">
        <p className="text-3xl"> Floor: {floor}  Area: {section} </p>
        <p className="text-3xl"> 剩餘車位數: {remainingSpaces.length}</p>
      </div>
      <div className="border-2 border-white rounded-lg w-auto h-screen m-8" style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
 {/* 1-10 */}
      <div style={{ flex: 1,display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {spaces.map((space) => (
        space.number <= 10 && (
          <Square 
            key= {space.number}
            floor= {space.floor}
            section= {space.section}
            number= {space.number}
            priority= {space.priority}  
            occupied= {space.occupied}
          />
        )
    ))}
  </div>

  {/* 11-20 */}
  <div style={{ flex: 1,display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
    {spaces.map((space) => (
      space.number > 10 && space.number <= 20 && (
        <Square
        key= {space.number}
        floor= {space.floor}
        section= {space.section}
        number= {space.number}
        priority= {space.priority}  
        occupied= {space.occupied}
        />
      )
    ))}
  </div>
</div>

    </>
  );
}