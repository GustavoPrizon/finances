import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { Routes } from "./src/routes";

import theme from "./src/global/styles/theme";

import { AuthProvider, useAuth } from "./src/hooks/auth";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
