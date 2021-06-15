/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { Provider as PaperProvider } from "react-native-paper";

import { AuthProvider } from "./context/auth";
import Navigation from "./Navigation";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
