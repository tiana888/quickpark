import HeaderBar from "@/components/HeaderBar";
export default function SpaceZoomPage() {
  return (
    <>
<<<<<<< Updated upstream
    <HeaderBar />
      <div>SpaceZoomPage</div>
=======
      <HeaderBar />

      {/* <Button onClick={}>INIT</Button> */}

      <div className="ml-10 ">
        <p className="text-3xl"> Floor: {floor}  Area: {section} </p>
        <p className="text-3xl"> 剩餘車位數: {remainingSpaces.length}</p>
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

>>>>>>> Stashed changes
    </>
  );
}
