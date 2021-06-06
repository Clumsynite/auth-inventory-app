/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
import React, { useRef } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./context/auth";
import Screens from "./screens";

export default function App() {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
              // function to call when route changed
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Screens" component={Screens} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  );
}
