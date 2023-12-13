import { useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

type NewDialogProps = {
  onClick?: (inputRef1?: string, inputRef2?: string) => void;
};

export default function HomeInput({ onClick }: NewDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const accountfieldRef = useRef<HTMLInputElement>(null);
  const passwordfieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Automatically set focus on the account field when the dialog opens
    if (accountfieldRef.current) {
      accountfieldRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (onClick) {
        onClick(
          accountfieldRef.current?.value,
          passwordfieldRef.current?.value,
        );
        accountfieldRef.current!.value = "";
        passwordfieldRef.current!.value = "";
      }
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center rounded-lg bg-white">
      <DialogContent>
        <TextField
          className="w-full p-1 lg:p-2"
          placeholder="請輸入帳號"
          onKeyDown={handleKeyDown}
          inputRef={accountfieldRef}
          variant="outlined"
          autoFocus={true}
        />
        <TextField
          className="w-full p-1 lg:p-2"
          placeholder="請輸入密碼"
          onKeyDown={handleKeyDown}
          inputRef={passwordfieldRef}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (onClick) {
              onClick(
                accountfieldRef.current?.value,
                passwordfieldRef.current?.value,
              );
              accountfieldRef.current!.value = "";
              passwordfieldRef.current!.value = "";
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
