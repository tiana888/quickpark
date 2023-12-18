import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { io } from "socket.io-client";

import { getSection } from "@/utils/client";
import { env } from "@/utils/env";

type SectionProps = {
  floor: string;
  section: string;
};
export default function Section({ floor, section }: SectionProps) {
  const [index, setIndex] = useState(0);
  const colors = ["#000000", "#8CDCB6", "#E8D782", "#EA8484"];
  const sectionToRoundedClass = {
    A: "rounded-tl-[20px]",
    B: "rounded-tr-[20px]",
    C: "",
    D: "",
    E: "rounded-bl-[20px]",
    F: "rounded-br-[20px]",
  };
  const roundedClass =
    sectionToRoundedClass[section as keyof typeof sectionToRoundedClass] || "";

  const fetchSection = useCallback(async () => {
    try {
      if (!floor || !section) return;
      const response = await getSection(floor, section);
      const spacesData = response.data;
      const occupiedCount = spacesData.filter(
        (space) => space.occupied === true,
      ).length;
      if (occupiedCount < 10) {
        setIndex(1);
      } else if (occupiedCount < 15) {
        setIndex(2);
      } else {
        setIndex(3);
      }
    } catch (error) {
      return;
    }
  }, [floor, section]);
  useEffect(() => {
    fetchSection();
    const newSocket = io(env.VITE_SOCKET_URL as string);
    newSocket.on("re-render", () => {
      fetchSection();
    });

    return () => {
      newSocket.close(); // 斷開連接
    };
  });
  return (
    <div
      className={`flex w-1/2 content-center justify-center  border-[6px] border-dashed border-white ${roundedClass}`}
      style={{ backgroundColor: colors[index] }}
    >
      <Link
        to={`../clientpage/spaceZoomPage/${floor}/${section}`}
        className="flex grow content-center justify-center "
      >
        <div className="flex items-center justify-items-center">
          <img src={`./${section}.png`} />
        </div>
      </Link>
    </div>
  );
}
