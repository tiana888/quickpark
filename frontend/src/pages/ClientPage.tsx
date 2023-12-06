import React from 'react';
import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";

export default function ClientPage() {
  // 创建一个数组，包含六个数字（可以是任意数字，这里用索引 i 作为 key）
  const gridItems = Array.from({ length: 6 }, (_, i) => i);

  // 可改成其他顏色變換，此為暫時
  const getColor = (index) => {
    if (index === 4 || index === 5) {
      return '#EA8484';
    }
    return index % 2 === 0 ? '#E8D782' : '#8CDCB6';
  };

  return (
    <>
      <HeaderBar />
      <div>ClientPage</div>
      <div className="mx-auto border rounded-lg w-2/3">
        <NewInput
          placeholder="請輸入密碼"
        />
           <img
                  src="/ColorBar.png"
                  alt="color"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25%', height: '25%' }}
                />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0px', marginTop: '100px' }}>
        {gridItems.map((item, index) => (
          <div key={item} style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%', border: '15px dashed white', textAlign: 'center', lineHeight: '50px', backgroundColor: getColor(item) }}>
            {index === 0 && (
              <>
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
              </>
            )}
            {index === 1 && (
              <>
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
              </>
            )}
            {index === 2 && (
             <img
             src="/C.png"
             alt="C"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            )}
            {index === 3 && (
             <img
             src="/D.png"
             alt="D"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            )}
            {index === 4 && (
             <img
             src="/E.png"
             alt="E"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            )}
            {index === 5 && (
             <img
             src="/F.png"
             alt="F"
             style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%', height: '10%' }}
            />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
