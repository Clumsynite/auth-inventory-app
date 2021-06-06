/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
import React, { useContext, useRef } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider, AuthContext } from "./context/auth";
import Screens from "./screens";
import AuthScreens from "./AuthScreens";

export default function App() {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const Stack = createStackNavigator();

  const { user } = useContext(AuthContext);

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
            {!user ? (
              <Stack.Screen name="Screens" component={AuthScreens} />
            ) : (
              <Stack.Screen name="Screens" component={Screens} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  );
}
