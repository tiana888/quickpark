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
  };
  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          position: "relative",
          alignItems: "center",
        }}
        onClick={handleClick}
      >
        <Button>
          <div
            style={{
              width: "150px",
              height: "75px",
              border: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {priority ? (
              <img
                src="/priority.png"
                alt="priority parking"
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  position: "absolute",
                }}
                className="z-0"
              />
            ) : (
              <div />
            )}
            {occupied ? (
              <img
                src="/car.png"
                alt="car"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: isNumberOnRight
                    ? "rotate(90deg)"
                    : "rotate(270deg)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
        </Button>
        <span
          className={`number-label`}
          style={{
            marginLeft: "0 !important",
            color: "white",
            fontWeight: "bold",
            fontSize: "30px",
            position: "absolute",
            [isNumberOnRight ? "left" : "right"]: "170px",
            transform: isNumberOnRight ? "rotate(90deg)" : "rotate(270deg)",
          }}
        >
          {isSingle ? "0" + number : number}
        </span>
      </div>
    </>
  );
}
