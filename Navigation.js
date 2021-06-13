import React, { useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./context/auth";
import Screens from "./screens";
import AuthScreens from "./AuthScreens";

const Navigation = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const Stack = createStackNavigator();

  const {
    state: { token },
  } = useContext(AuthContext);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
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
        {!token ? (
          <Stack.Screen name="Screens" component={AuthScreens} />
        ) : (
          <Stack.Screen name="Screens" component={Screens} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
