import { useContext, useState } from "react";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";

import context from "../../global/context";

import { TContext } from "../../global/types";

const SignIn: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { handleSetLoginData } = useContext(context) as TContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      handleSetLoginData(data);
      console.log(data);
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
      {!!errors["global"] && (
        <FormHelperText error>{errors["global"]}</FormHelperText>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
