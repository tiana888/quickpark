import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GetSpacesResponse } from "@lib/shared_types";

import HeaderBar from "@/components/HeaderBar";
import Square from "@/components/Square";
import { getSection } from "@/utils/client";
export default function SpaceZoomPage() {
  const [spaces, setSpaces] = useState<GetSpacesResponse>([]);
  const remainingSpaces = spaces.filter(
    (space) => space.number <= 20 && !space.occupied,
  );
  const { floor, section } = useParams();
  const fetchSpace = useCallback(async () => {
    try {
      if (!floor || !section) return;
      const response = await getSection(floor, section);
      const spacesData = response.data;
      setSpaces(spacesData);
    } finally {
      console.log(spaces);
    }
  }, []);

  useEffect(() => {
    fetchSpace();
  });
  return (
    <>
      <HeaderBar />

      {/* <Button onClick={}>INIT</Button> */}

      <div className="ml-10 ">
        <p className="text-3xl">
          {" "}
          樓層: {floor} 區域: {section}{" "}
        </p>
        <p className="m-5 text-3xl"> 剩餘車位數: {remainingSpaces.length}</p>
      </div>
    
      <div className="flex flex-row overflow-auto justify-between border-2 border-white rounded-lg w-auto h-screen m-8 gap-16" >
    
 {/* 1-10 */}
 <div className="flex-1 flex flex-col content-start">
 {spaces.map((space) => 
  space.number <= 10 && (
      <Square
        key={space.number}
        floor={space.floor}
        section={space.section}
        number={space.number}
        priority={space.priority} 
        occupied={space.occupied}
        license={space.license}
        arrivalTime={space.arrivalTime}
        departureTime={space.departureTime}
        history={space.history}
      />
    ),
  )}
</div>

{/* 11-20 */}
<div className="flex-1 flex flex-col content-start">
  {spaces.map((space) => 
     space.number > 10 && space.number <= 20 && (
      <Square
        key={space.number}
        floor={space.floor}
        section={space.section}
        number={space.number}
        priority={space.priority} 
        occupied={space.occupied}
        license={space.license}
        arrivalTime={space.arrivalTime}
        departureTime={space.departureTime}
        history={space.history}
      />
    ),
  )}
</div>
</div>

    </>
  );
}
