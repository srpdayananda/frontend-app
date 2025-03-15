import React from "react";
import { Button, colors, TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormContext } from "react-hook-form";

import { TUserFormValue } from "../../../types/user-input-props.type";

interface IPasswordSectionInputProps {
  isSubmitting: boolean;
}

const PasswordSection: React.FC<IPasswordSectionInputProps> = ({
  isSubmitting,
}) => {
  const [pinNumber, setPinNumber] = React.useState<string>("");
  const {
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useFormContext<TUserFormValue>();
  const [password, setPassword] = React.useState<string>("");

  const generatePinClickHandler = async () => {
    const responsePin: number = 1234;
    setValue("pin", responsePin.toString());
    setPinNumber(responsePin.toString());
    clearErrors("pin");
  };

  const copyPinNumberClickHandler = () => {
    navigator.clipboard.writeText(pinNumber).then(() => {});
  };

  React.useEffect(() => {
    if (isSubmitting && !pinNumber) {
      setError("pin", {
        type: "manual",
        message: "Security pin number is required",
      });
    }
    if (isSubmitting && !password) {
      setError("password", { type: "manual", message: "Password is required" });
    } else if (isSubmitting && password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least 8 characters",
      });
    } else {
      clearErrors("password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, password, pinNumber]);

  return (
    <div
      className="security-pin-number-form"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <div
        style={{ flex: "1 1 100%", maxWidth: "33.33%", paddingRight: "1rem" }}
      >
        <div>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            autoComplete="password"
            type="password"
            {...register("password")}
            className={`text-field Mui-focused ${
              errors.password ? "Mui-error" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password && (
            <p style={{ color: colors.red[500], margin: "3px" }}>
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          flex: "1 1 100%",
          maxWidth: "41.67%",
          paddingRight: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              type="button"
              variant="contained"
              className="generate-pin-btn"
              startIcon={<RefreshIcon />}
              onClick={generatePinClickHandler}
            >
              Generate a Pin
            </Button>
            <Button
              type="button"
              variant="contained"
              className="copy-pin-btn"
              startIcon={<ContentCopyIcon />}
              onClick={copyPinNumberClickHandler}
            >
              Copy Pin
            </Button>
          </div>
          {errors?.pin && (
            <p
              style={{
                color: colors.red[500],
                marginTop: "15px",
                marginLeft: "3px",
              }}
            >
              {errors.pin.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;
