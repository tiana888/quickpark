import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
import { getSpaces } from "@/utils/client";

export default function ClientPage2() {
  // 创建一个数组，包含六个数字（可以是任意数字，这里用索引 i 作为 key）
  const gridItems = Array.from({ length: 6 }, (_, i) => i);
  const [countsB3A, setCountsB3A] = useState(0);
  const [countsB3B, setCountsB3B] = useState(0);
  const [countsB3C, setCountsB3C] = useState(0);
  const [countsB3D, setCountsB3D] = useState(0);
  const [countsB3E, setCountsB3E] = useState(0);
  const [countsB3F, setCountsB3F] = useState(0);
  // 可改成其他顏色變換，此為暫時
  const Get_Space = async () => {
    try {
      const result = await getSpaces();
      const allSpace = (await result).data;
      const B3 = allSpace.slice(
        (allSpace.length / 3) * 2,
        (allSpace.length / 3) * 3,
      );

      const B3A = B3.slice(0, B3.length / 6);
      const B3B = B3.slice(B3.length / 6, (B3.length / 6) * 2);
      const B3C = B3.slice((B3.length / 6) * 2, (B3.length / 6) * 3);
      const B3D = B3.slice((B3.length / 6) * 3, (B3.length / 6) * 4);
      const B3E = B3.slice((B3.length / 6) * 4, (B3.length / 6) * 5);
      const B3F = B3.slice((B3.length / 6) * 5, (B3.length / 6) * 6);
      let countA = 0;
      let countB = 0;
      let countC = 0;
      let countD = 0;
      let countE = 0;
      let countF = 0;

      B3A.forEach((space) => {
        if (space.occupied === true) {
          countA = countA + 1;
        }
      });
      setCountsB3A(countA);

      B3B.forEach((space) => {
        if (space.occupied === true) {
          countB = countB + 1;
        }
      });
      setCountsB3B(countB);

      B3C.forEach((space) => {
        if (space.occupied === true) {
          countC = countC + 1;
        }
      });
      setCountsB3C(countC);

      B3D.forEach((space) => {
        if (space.occupied === true) {
          countD = countD + 1;
        }
      });
      setCountsB3D(countD);

      B3E.forEach((space) => {
        if (space.occupied === true) {
          countE = countE + 1;
        }
      });
      setCountsB3E(countE);

      B3F.forEach((space) => {
        if (space.occupied === true) {
          countF = countF + 1;
        }
      });
      setCountsB3F(countF);
      // Repeat the process for other areas (B1B, B1C, B1D, B1E, B1F)
    } catch (error) {
      console.error("Error fetching space data:", error);
    }
  };

  useEffect(() => {
    Get_Space();
  }, []); // Empty dependency array ensures it only runs once on mount

  const getColor = (counts: number) => {
    if (counts >= 10 && counts <= 15) {
      return "#E8D782"; // Yellow when counts are greater than 0
    }
    if (counts >= 0 && counts < 10) {
      return "#8CDCB6"; // Green when counts are 0
    }
    if (counts > 15) {
      return "#EA8484"; // Green when counts are 0
    }
  };
  const getCountForIndex = (index: number) => {
    switch (index) {
      case 0:
        return countsB3A;
      case 1:
        return countsB3B;
      case 2:
        return countsB3C;
      case 3:
        return countsB3D;
      case 4:
        return countsB3E;
      case 5:
        return countsB3F;
      default:
        return 0;
    }
  };

  return (
    <>
      <button onClick={Get_Space} className="border-2 border-white">
        GET測試
      </button>
      <HeaderBar />
      <div>ClientPage3</div>
      <div
        className="mx-auto w-2/3 rounded-lg border"
        style={{ position: "relative", cursor: "pointer" }}
      >
        <NewInput placeholder="請輸入密碼" />
        <div
          style={{
            position: "absolute",
            top: "150%",
            left: "0",
            transform: "translate(0, -50%)",
            width: "25%",
            height: "25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white", fontSize: "18px" }}>
            點擊區域查看空位
          </span>
        </div>
        <img
          src="/ColorBar.png"
          alt="color"
          style={{
            position: "absolute",
            top: "150%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "40%",
          }}
        />
      </div>

      {/* Grid items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0px",
          marginTop: "100px",
        }}
      >
        {gridItems.map((item, index) => (
          <div
            key={item}
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingBottom: "100%",
              border: "15px dashed white",
              textAlign: "center",
              lineHeight: "50px",
              backgroundColor: getColor(getCountForIndex(index)),
            }}
          >
            {index === 0 && (
              <>
                <Link to="/clientpage/spacezoompage/B3/A">
                  <img
                    src="/A.png"
                    alt="A"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "10%",
                      height: "10%",
                    }}
                  />
                  <img
                    src="/DisableIcon.png"
                    alt="Disable"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Link>
              </>
            )}
            {index === 1 && (
              <>
                <Link to="/clientpage/spacezoompage/B3/B">
                  <img
                    src="/B.png"
                    alt="B"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "10%",
                      height: "10%",
                    }}
                  />
                  <img
                    src="/DisableIcon.png"
                    alt="Disable"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Link>
              </>
            )}
            {index === 2 && (
              <Link to="/clientpage/spacezoompage/B3/C">
                <img
                  src="/C.png"
                  alt="C"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "10%",
                    height: "10%",
                  }}
                />
              </Link>
            )}
            {index === 3 && (
              <Link to="/clientpage/spacezoompage/B3/D">
                <img
                  src="/D.png"
                  alt="D"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "10%",
                    height: "10%",
                  }}
                />
              </Link>
            )}

            {index === 4 && (
              <Link to="/clientpage/spacezoompage/B3/E">
                <img
                  src="/E.png"
                  alt="E"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "10%",
                    height: "10%",
                  }}
                />
              </Link>
            )}

            {index === 5 && (
              <Link to="/clientpage/spacezoompage/B3/F">
                <img
                  src="/F.png"
                  alt="F"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "10%",
                    height: "10%",
                  }}
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Button to switch to ClientPage2 */}
      <Link to="/clientpage">
        <button className="my-10  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          切換到 B1
        </button>
      </Link>

      <Link to="/clientpage/clientpage2">
        <button className="mx-50 my-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          切換到 B2
        </button>
      </Link>
    </>
  );
}
