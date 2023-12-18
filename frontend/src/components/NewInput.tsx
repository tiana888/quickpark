import { useRef } from "react";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

type NewDialogProps = {
  placeholder: string;
  onClick?: (inputRef?: string) => void;
};

export default function NewInput({ placeholder, onClick }: NewDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (onClick) {
        onClick(textfieldRef.current?.value); // 按下 Enter 键后执行点击动作
      }
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center rounded-2xl bg-white">
      <DialogContent>
        <TextField
          className="w-full p-1 lg:p-2"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          inputRef={textfieldRef}
          variant="outlined"
          autoFocus={true}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (onClick) {
              onClick(textfieldRef.current?.value); // 按下 Enter 键后执行点击动作
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
    </div>
  );
}
