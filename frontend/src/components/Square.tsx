import { Button } from "@mui/material";
import type { Socket } from "socket.io-client";

import { updateSpace } from "@/utils/client";

type SquareProps = {
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
  socket: Socket | null;
};

export default function Square({
  floor,
  section,
  number,
  priority,
  occupied,
  license,
  arrivalTime,
  history,
  socket,
}: SquareProps) {
  const isNumberOnRight = number <= 10;
  const isSingle = number < 10;

  const randomLicense = async () => {
    const letterCount = 3;
    const numberCount = 4;

    const letters = Array.from({ length: letterCount }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    ).join("");

    const numbers = Array.from({ length: numberCount }, () =>
      String.fromCharCode(48 + Math.floor(Math.random() * 10)),
    ).join("");
    return letters + numbers;
  };
  const handleClick = async () => {
    const now = new Date();
    if (!occupied) {
      const newLicense = await randomLicense();
      await updateSpace(floor, section, number, {
        license: newLicense,
        arrivalTime: now,
      });
    } else {
      if (!arrivalTime || !license) return;
      await updateSpace(floor, section, number, {
        history: [
          ...history,
          { license: license, arrivalTime: arrivalTime, departureTime: now },
        ],
      });
      await updateSpace(floor, section, number, {
        license: "",
        arrivalTime: undefined,
      });
    }
    await updateSpace(floor, section, number, { occupied: !occupied });
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }
    socket.emit("spaces-updated");
  };
  return (
    <div
      className="parking-lot"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isNumberOnRight ? "start" : "end",
      }}
    >
      <div
        className="relative flex flex-1 content-center"
        onClick={handleClick}
      >
        <Button>
          <div
            className="box flex"
            style={{
              width: "20vw",
              height: "10vw",
              maxWidth: "200px",
              maxHeight: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {priority && (
              <img
                src="/priority1.png"
                alt="priority parking"
                className="h-4/12 absolute z-0 w-4/12 object-contain "
                style={{
                  transform: isNumberOnRight
                    ? "rotate(90deg)"
                    : "rotate(270deg)",
                }}
              />
            )}
            {occupied ? (
              <img
                src="/car.png"
                alt="car"
                className="absolute h-full w-full object-contain"
                style={{
                  transform: isNumberOnRight
                    ? "rotate(90deg)"
                    : "rotate(270deg)",
                }}
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
        </Button>
        <span
          className="number-label absolute font-bold text-white"
          style={{
            top: "50%",
            left: isNumberOnRight ? "calc(100% + 2px)" : undefined,
            right: isNumberOnRight ? undefined : "calc(100% + 2px)",
            transform: "translateY(-50%)",
            zIndex: 10,
            fontSize: "5vw",
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {isSingle ? `0${number}` : number}
        </span>
      </div>
    </div>
  );
}
