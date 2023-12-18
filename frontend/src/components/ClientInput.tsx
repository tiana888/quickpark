import { useRef, useState } from "react";

import type { GetSpaceResponse } from "@lib/shared_types";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { getSpaceByLicense } from "@/utils/client";

type NewDialogProps = {
  placeholder: string;
  onClick?: (inputRef?: string) => void;
};

export default function ClientInput({ placeholder }: NewDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const [duration, setDuration] = useState("");
  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState<GetSpaceResponse>();
  const textfieldRef = useRef<HTMLTextAreaElement>(null);
  const handleSearch = async (license: string) => {
    const res = await getSpaceByLicense(license);
    const spaceInfo = res.data;
    setSpace(spaceInfo);
    if (!spaceInfo) {
      return;
    }
    const now = +new Date();
    if (!spaceInfo.arrivalTime) return;
    //先轉string再轉Date才能用getTime(), 再做timestamp相減
    const isoDateString: string = spaceInfo?.arrivalTime.toString();
    const date: Date = new Date(isoDateString);
    const timestamp: number = date.getTime();
    const days = Math.floor(
      (now - timestamp) /
        (millisecondsPerSecond *
          secondsPerMinute *
          minutesPerHour *
          hoursPerDay),
    );
    const hours = Math.floor(
      ((now - timestamp) /
        (millisecondsPerSecond * secondsPerMinute * minutesPerHour)) %
        hoursPerDay,
    );
    const minutes = Math.floor(
      ((now - timestamp) / (millisecondsPerSecond * secondsPerMinute)) %
        minutesPerHour,
    );
    const seconds = Math.floor(
      ((now - timestamp) / millisecondsPerSecond) % secondsPerMinute,
    );
    setDuration(
      `Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`,
    );

    handleOpen();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="mx-auto flex items-center justify-center rounded-2xl bg-white">
      <DialogContent>
        <TextField
          className="w-full p-1 lg:p-2"
          placeholder={placeholder}
          inputRef={textfieldRef}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (textfieldRef.current?.value) {
              handleSearch(textfieldRef.current?.value);
            }
          }}
        >
          <img
            className="h-8 lg:h-10 lg:w-14 lg:w-16"
            src="./enter.png"
            alt="enter"
          />
        </Button>
      </DialogActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>YOUR CAR: {textfieldRef.current?.value}</DialogTitle>
        <DialogContent className="text-xl">
          <div className="mb-2">
            <div>Location: </div>
            <div>
              {space?.floor} {space?.section} {space?.number}
            </div>
          </div>
          <div>Duration:</div>
          <div> {duration}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
