import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import { TLoginData, TAdmin } from "./global/types";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

import context from "./global/context";

import "./App.css";
import { GlobalStyles } from "@mui/material";

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();
  const [admin, setAdmin] = useState<TAdmin>();

  const navigate = useNavigate();

  const handleSetLoginData = ({
    admin,
    accessToken,
    refreshToken,
  }: TLoginData) => {
    setAdmin(admin);
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/users");
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    setAccessToken(accessToken ? accessToken : undefined);
    axios
      .post("/api/auth/refresh", {
        refreshToken,
      })
      .then(({ data }) => {
        handleSetLoginData(data);
        navigate("/users");
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    setAccessToken("");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    navigate("/login");
  };

  return (
    <>
      <context.Provider
        value={{
          accessToken,
          admin,
          handleSetLoginData,
          handleLogout,
        }}
      >
        <GlobalStyles styles={{ body: { display: "block" } }} />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </context.Provider>
    </>
  );
};

export default App;
