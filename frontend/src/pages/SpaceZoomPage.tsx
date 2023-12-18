import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { GetSpacesResponse } from "@lib/shared_types";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

import HeaderBar from "@/components/HeaderBar";
import Square from "@/components/Square";
import { getSection } from "@/utils/client";
import { env } from "@/utils/env";

export default function SpaceZoomPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
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
    } catch (error) {
      return;
    }
  }, [floor, section]);

  useEffect(() => {
    fetchSpace();
    const newSocket = io(env.VITE_SOCKET_URL as string);
    newSocket.on("re-render", () => {
      fetchSpace();
    });

    setSocket(newSocket);
    return () => {
      newSocket.close(); // 斷開連接
    };
  }, [fetchSpace]);
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

      <div className="m-8 flex h-auto w-auto flex-row justify-between gap-16 overflow-auto rounded-lg border-2 border-white">
        {/* 1-10 */}
        <div className="flex flex-1 flex-col content-start">
          {spaces.map(
            (space) =>
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
                  socket={socket}
                />
              ),
          )}
        </div>

        {/* 11-20 */}
        <div className="flex flex-1 flex-col content-start">
          {spaces.map(
            (space) =>
              space.number > 10 &&
              space.number <= 20 && (
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
                  socket={socket}
                />
              ),
          )}
        </div>
      </div>
    </>
  );
}
