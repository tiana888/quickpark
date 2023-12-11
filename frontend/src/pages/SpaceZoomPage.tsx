import HeaderBar from "@/components/HeaderBar";
import { getSection } from "@/utils/client";
import Square from "@/components/Square";
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { GetSpacesResponse } from "@lib/shared_types";

export default function SpaceZoomPage() {
  
  const [spaces, setSpaces] = useState<GetSpacesResponse>([])
  const remainingSpaces = spaces.filter(space => space.number <= 20 && !space.occupied);
  const { floor, section } = useParams();
  const fetchSpace = useCallback(async() => {
    try{
      if(!floor || !section) return;
      const response = await getSection(floor, section);
      const spacesData = response.data;
      setSpaces(spacesData);
    }finally{
      console.log(spaces);
    }
  },[])

  useEffect(()=>{
    fetchSpace();
  });

  return (
    <>
      <HeaderBar />

      {/* <Button onClick={}>INIT</Button> */}

      <div className="ml-10 ">
        <p className="text-3xl"> 樓層: {floor}  區域: {section} </p>
        <p className="text-3xl m-5"> 剩餘車位數: {remainingSpaces.length}</p>
      </div>
      <div className=" border-white rounded-2xl w-auto h-screen m-8" style={{ display: "flex", justifyContent: "space-between", flexDirection: "row",borderWidth: "12px" }}>
 {/* 1-10 */}
        <div style={{ flex: 1,display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
          {spaces.map((space) => (
          space.number <= 10 && (
            <Square
              key= {space.number}
              floor= {space.floor}
              section= {space.section}
              number= {space.number}
              priority= {space.priority}  
              occupied= {space.occupied}
              license= {space.license}
              arrivalTime= {space.arrivalTime}
              departureTime={space.departureTime}
              history={space.history}
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
                license= {space.license}
                arrivalTime= {space.arrivalTime}
                departureTime={space.departureTime}
                history={space.history}
              />
            )
          ))}
        </div>
      </div>

    </>
  );
}