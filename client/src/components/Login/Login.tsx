import { useState } from "react";
import { Box, Card, CardContent, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import SignIn from "./SignIn";
import Registration from "./Registration";

const Login: React.FC = () => {
  const [tab, setTab] = useState<string>("1");

  return (
    <Card style={{ maxWidth: 450, minWidth: 380 }}>
      <CardContent>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(_, value: string) => setTab(value)}
              aria-label="lab API tabs example"
            >
              <Tab style={{ outline: "none" }} label="Sign in" value="1" />
              <Tab style={{ outline: "none" }} label="Registration" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignIn />
          </TabPanel>
          <TabPanel value="2">
            <Registration />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default Login;
