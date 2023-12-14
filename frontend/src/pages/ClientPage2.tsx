import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
import { getSpaces } from "@/utils/client";

export default function ClientPage3() {
  // 创建一个数组，包含六个数字（可以是任意数字，这里用索引 i 作为 key）
  const gridItems = Array.from({ length: 6 }, (_, i) => i);
  const [countsB2A, setCountsB2A] = useState(0);
  const [countsB2B, setCountsB2B] = useState(0);
  const [countsB2C, setCountsB2C] = useState(0);
  const [countsB2D, setCountsB2D] = useState(0);
  const [countsB2E, setCountsB2E] = useState(0);
  const [countsB2F, setCountsB2F] = useState(0);

  // 可改成其他顏色變換，此為暫時
  const Get_Space = async () => {
    try {
      const result = await getSpaces();
      const allSpace = (await result).data;
      const B2 = allSpace.slice(allSpace.length / 3, allSpace.length / 3*2);

      const B2A = B2.slice(0, B2.length / 6);
      const B2B = B2.slice(B2.length / 6, B2.length / 6*2);
      const B2C = B2.slice(B2.length / 6*2, B2.length /6*3);
      const B2D = B2.slice(B2.length /6*3, B2.length / 6*4);
      const B2E = B2.slice(B2.length /6*4, B2.length / 6*5);
      const B2F = B2.slice(B2.length/6*5, B2.length / 6*6);
      let countA = 0;
      let countB = 0;
      let countC = 0;
      let countD = 0;
      let countE = 0;
      let countF = 0;

      B2A.forEach((space) => {
        if (space.occupied === true) {
          countA = countA + 1;
        }
      });
      setCountsB2A(countA);

      B2B.forEach((space) => {
        if (space.occupied === true) {
          countB = countB + 1;
        }
      });
      setCountsB2B(countB);

      B2C.forEach((space) => {
        if (space.occupied === true) {
          countC = countC + 1;
        }
      });
      setCountsB2C(countC);

      B2D.forEach((space) => {
        if (space.occupied === true) {
          countD = countD + 1;
        }
      });
      setCountsB2D(countD);

      B2E.forEach((space) => {
        if (space.occupied === true) {
          countE = countE + 1;
        }
      });
      setCountsB2E(countE);

      B2F.forEach((space) => {
        if (space.occupied === true) {
          countF = countF + 1;
        }
      });
      setCountsB2F(countF);
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
        return countsB2A;
      case 1:
        return countsB2B;
      case 2:
        return countsB2C;
      case 3:
        return countsB2D;
      case 4:
        return countsB2E;
      case 5:
        return countsB2F;
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
      <div>ClientPage2</div>
      <div className="mx-auto border rounded-lg w-2/3" style={{ position: 'relative', cursor: 'pointer' }}>
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
          <div key={item} style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%', border: '15px dashed white', textAlign: 'center', lineHeight: '50px', backgroundColor: getColor(getCountForIndex(index)), }}>
            
            {index === 0 && (
              <>
              <Link to= '/clientpage/spacezoompage/B2/A'>
                <img
                  src="/A.png"
                  alt="A"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
                />
                <img
                  src="/DisableIcon.png"
                  alt="Disable"
                  style={{ position: 'absolute', top: '0', right: '0', width: '50px', height: '50px' }}
                />
                </Link>
              </>
            )}

            {index === 1 && (
              <>
              <Link to= '/clientpage/spacezoompage/B2/B'>
                <img
                  src="/B.png"
                  alt="B"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
                />
                <img
                  src="/DisableIcon.png"
                  alt="Disable"
                  style={{ position: 'absolute', top: '0', right: '0', width: '50px', height: '50px' }}
                />
                </Link>
              </>
            )}

            {index === 2 && (
              <Link to= '/clientpage/spacezoompage/B2/C'>
             <img
             src="/C.png"
             alt="C"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            </Link>
            )}

            {index === 3 && (
              <Link to= '/clientpage/spacezoompage/B2/D'>
             <img
             src="/D.png"
             alt="D"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            </Link>
            )}

            {index === 4 && (
              <Link to= '/clientpage/spacezoompage/B2/E'>
             <img
             src="/E.png"
             alt="E"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            </Link>
            )}

            {index === 5 && (
              <Link to= '/clientpage/spacezoompage/B2/F'>
             <img
             src="/F.png"
             alt="F"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            </Link>
            )}
          </div>
        ))}
      </div>

         {/* Button to switch to ClientPage2 */}
      <Link to="/clientpage">  
        <button className="my-10  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          切換到 B1
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



