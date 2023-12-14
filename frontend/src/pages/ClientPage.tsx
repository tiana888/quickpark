import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
import { getSpaces } from "@/utils/client";

/* eslint-disable no-console */
export default function ClientPage() {
  const gridItems = Array.from({ length: 6 }, (_, i) => i);
  const [countsB1A, setCountsB1A] = useState(0);
  const [countsB1B, setCountsB1B] = useState(0);
  const [countsB1C, setCountsB1C] = useState(0);
  const [countsB1D, setCountsB1D] = useState(0);
  const [countsB1E, setCountsB1E] = useState(0);
  const [countsB1F, setCountsB1F] = useState(0);

  const Get_Space = async () => {
    try {
      const result = await getSpaces();
      const allSpace = (await result).data;
      const B1 = allSpace.slice(0, allSpace.length / 3);

      const B1A = B1.slice(0, B1.length / 6);
      const B1B = B1.slice(B1.length / 6, B1.length / 6*2);
      const B1C = B1.slice(B1.length / 6*2, B1.length /6*3);
      const B1D = B1.slice(B1.length /6*3, B1.length / 6*4);
      const B1E = B1.slice(B1.length /6*4, B1.length / 6*5);
      const B1F = B1.slice(B1.length/6*5, B1.length / 6*6);
      let countA = 0;
      let countB = 0;
      let countC = 0;
      let countD = 0;
      let countE = 0;
      let countF = 0;

      B1A.forEach((space) => {
        if (space.occupied === true) {
          countA = countA + 1;
        }
      });
      setCountsB1A(countA);

      B1B.forEach((space) => {
        if (space.occupied === true) {
          countB = countB + 1;
        }
      });
      setCountsB1B(countB);

      B1C.forEach((space) => {
        if (space.occupied === true) {
          countC = countC + 1;
        }
      });
      setCountsB1C(countC);

      B1D.forEach((space) => {
        if (space.occupied === true) {
          countD = countD + 1;
        }
      });
      setCountsB1D(countD);

      B1E.forEach((space) => {
        if (space.occupied === true) {
          countE = countE + 1;
        }
      });
      setCountsB1E(countE);

      B1F.forEach((space) => {
        if (space.occupied === true) {
          countF = countF + 1;
        }
      });
      setCountsB1F(countF);
      // Repeat the process for other areas (B1B, B1C, B1D, B1E, B1F)


    } catch (error) {
      console.error('Error fetching space data:', error);
    }
  };

  useEffect(() => {
    Get_Space();
  }, []); // Empty dependency array ensures it only runs once on mount

  const getColor = (counts) => {
    if (counts >=10 && counts <= 15) {
      return '#E8D782'; // Yellow when counts are greater than 0
    }
    if (counts >= 0 && counts < 10){
    return '#8CDCB6'; // Green when counts are 0
    }
    if (counts > 15){
      return '#EA8484'; // Green when counts are 0
      }
  };
  const getCountForIndex = (index) => {
    switch (index) {
      case 0:
        return countsB1A;
      case 1:
        return countsB1B;
      case 2:
        return countsB1C;
      case 3:
        return countsB1D;
      case 4:
        return countsB1E;
      case 5:
        return countsB1F;
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
      <div>ClientPage</div>
      <div className="mx-auto border rounded-lg w-2/3"  style={{ position: 'relative', cursor: 'pointer' }}>
        <NewInput
          placeholder="請輸入密碼"
        />
        <div
          style={{
            position: 'absolute',
            top: '150%',
            left: '0',
            transform: 'translate(0, -50%)',
            width: '25%',
            height: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'white', fontSize: '18px' }}>點擊區域查看空位</span>
        </div>
        <img
          src="/ColorBar.png"
          alt="color"
          style={{ position: 'absolute', top: '150%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', height: '40%' }}
        />
      </div>
        
      {/* Grid items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0px', marginTop: '100px' }}>
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
              <Link to= 'SpaceZoomPage/B1/A'>
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
                    //backgroundColor: getColor(),
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
              <Link to= 'SpaceZoomPage/B1/B'>
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
              <Link to= 'SpaceZoomPage/B1/C'>
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
              <Link to= 'SpaceZoomPage/B1/D'>
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
              <Link to= 'SpaceZoomPage/B1/E'>
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
              <Link to= 'SpaceZoomPage/B1/F'>
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
          ))
        }
      </div>
 

      {/* Button to switch to ClientPage2 */}


      <Link to="/clientpage/clientpage2">
        <button className="my-10 mx-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          切換到 B2
        </button>
      </Link>

      <Link to="/clientpage/clientpage3">
        <button className="my-10 mx-85 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          切換到 B3
        </button>
      </Link>
    </>
  );
}
