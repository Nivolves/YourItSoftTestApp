import { useContext, useState } from "react";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";

import context from "../../global/context";

import { TContext } from "../../global/types";

const Registration: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { handleSetLoginData } = useContext(context) as TContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      return setErrors({ global: "Passwords do not match" });
    }

    try {
      const { data } = await axios.post("/api/auth/sign-up", {
        email,
        password,
      });
      handleSetLoginData(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        const errMessageData = response?.data?.message;
        if (errMessageData) {
          const [field, errMessage] = Array.isArray(errMessageData)
            ? errMessageData[0].split(":")
            : errMessageData.split(":");
          if (!errMessage) {
            return setErrors({ ["global"]: field });
          }

          return setErrors({ [field]: errMessage });
        }
        return setErrors({ ["global"]: "Something went wrong" });
      }
    }
  };

  console.log(errors);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        error={!!errors["email"]}
        FormHelperTextProps={{
          style: { marginLeft: 0 },
        }}
        helperText={errors["email"]}
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        error={!!errors["password"]}
        FormHelperTextProps={{
          style: { marginLeft: 0 },
        }}
        helperText={errors["password"]}
        type="password"
        id="password"
        autoComplete="password"
      />
      <TextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
        fullWidth
        name="confirm-password"
        label="Confirm password"
        error={!!errors["confirmPassword"]}
        FormHelperTextProps={{
          style: { marginLeft: 0 },
        }}
        helperText={errors["confirmPassword"]}
        type="password"
        id="confirm-password"
        autoComplete="confirm-password"
      />
      {!!errors["global"] && (
        <FormHelperText error>{errors["global"]}</FormHelperText>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default Registration;
