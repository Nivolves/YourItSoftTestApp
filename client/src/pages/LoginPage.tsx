import { Box, Grid } from "@mui/material";

import Login from "../components/Login/Login";

const LoginPage: React.FC = () => (
  <Box sx={{ flexGrow: 1, p: 0 }}>
    <Grid container height="100vh">
      <Grid
        container
        direction="column"
        alignItems="center"
        paddingTop={10}
        item
        xs={12}
        md={6}
        sm={6}
      >
        <Login />
      </Grid>
      <Grid item xs={12} md={6} sm={6} bgcolor="blue" />
    </Grid>
  </Box>
);
export default LoginPage;
