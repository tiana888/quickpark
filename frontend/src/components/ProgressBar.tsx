import { Progress } from "@material-tailwind/react";

type ProgressProps = {
  percentage: number;
  _text: string;
};

export default function ProgressBar({ percentage, _text }: ProgressProps) {
  return (
    <>
      {/* <div className="flex w-full flex-col gap-10">
      <Progress value={50} color="blue" />
      <Progress value={50} color="teal" />
      <Progress value={50} color="indigo" />
    </div> */}
      <div className="m-4 mx-auto flex w-5/6 flex-col items-center justify-center gap-5">
        <Progress
          value={percentage}
          color="green"
          size="lg"
          label={_text}
          style={{ height: "50px", fontSize: "1.2rem" }}
        />
      </div>
    </>
  );
}
