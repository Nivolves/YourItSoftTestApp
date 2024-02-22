import { useContext } from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

import context from "../../global/context";

import { TContext } from "../../global/types";

const Header: React.FC = () => {
  const { handleLogout } = useContext(context) as TContext;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              cursor: "pointer",
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleLogout()}
          >
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
