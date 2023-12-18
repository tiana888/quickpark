import { useRef, useEffect, useState } from "react";
import React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

type NewDialogProps = {
  onClick?: (inputRef1?: string, inputRef2?: string) => void;
};

export default function HomeInput({ onClick }: NewDialogProps) {
  const accountfieldRef = useRef<HTMLInputElement>(null);
  const passwordfieldRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Automatically set focus on the account field when the dialog opens
    if (accountfieldRef.current) {
      accountfieldRef.current.focus();
    }
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

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
    <>
      <DialogTitle className="flex justify-center border-b">
        Identity verification
      </DialogTitle>
      <div className="mx-auto flex items-center justify-center rounded-lg bg-white">
        <DialogContent>
          <div className="flex flex-col">
            <div className="mb-1">
              <TextField
                className="w-full p-1 lg:p-2"
                placeholder="請輸入帳號"
                onKeyDown={handleKeyDown}
                inputRef={accountfieldRef}
                variant="outlined"
                autoFocus={true}
              />
            </div>
            <div className="mt-1">
              <TextField
                className="w-full p-1 lg:p-2"
                type={showPassword ? "text" : "password"}
                placeholder="請輸入密碼"
                onKeyDown={handleKeyDown}
                inputRef={passwordfieldRef}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
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
    </>
  );
}
