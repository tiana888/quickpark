import Section from "@/components/Section";

type FloorProps = {
  floor: string;
  handleFloorChange: (to: number) => void;
};

export default function Floor({ floor, handleFloorChange }: FloorProps) {
  const floorNum = parseInt(floor[floor.length - 1], 10);

  return (
    <div className="flex w-[100vw] items-center">
      {floorNum - 1 < 1 ? (
        <div className="w-[60px]" />
      ) : (
        <button
          className="h-[60px] w-[60px] px-[5px]"
          onClick={() => {
            handleFloorChange(floorNum - 1);
          }}
        >
          <img src="./arrow_blue.png" />
        </button>
      )}

      <div className="mx-2 mb-4 grow">
        <div className="flex h-48">
          <Section floor={floor} section="A" />
          <Section floor={floor} section="B" />
        </div>
        <div className="flex h-48">
          <Section floor={floor} section="C" />

          <Section floor={floor} section="D" />
        </div>
        <div className="flex h-48">
          <Section floor={floor} section="E" />
          <Section floor={floor} section="F" />
        </div>
      </div>
      {floorNum + 1 > 3 ? (
        <div className="w-[60px]" />
      ) : (
        <button
          className="h-[60px] w-[60px] px-[5px]"
          onClick={() => {
            handleFloorChange(floorNum + 1);
          }}
        >
          <img src="./arrow_blue.png" style={{ transform: "scaleX(-1)" }} />
        </button>
      )}
    </div>
  );
}
