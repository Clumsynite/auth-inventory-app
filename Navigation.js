import React, { useContext, useRef, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";

import { AuthContext } from "./context/auth";
import SecureScreens from "./SecureScreens";
import AuthScreens from "./AuthScreens";
import OfflineScreen from "./OfflineScreen";
import SplashScreen from "./SplashScreen";

const Navigation = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const Stack = createStackNavigator();

  const {
    state: { token, isLoading },
  } = useContext(AuthContext);

  const [connected, setConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
  }, []);

  if (isLoading) return <SplashScreen />;

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
        {!connected ? (
          <Stack.Screen name="OfflineScreen" component={OfflineScreen} />
        ) : !token ? (
          <Stack.Screen name="AuthScreens" component={AuthScreens} />
        ) : (
          <Stack.Screen name="SecureScreens" component={SecureScreens} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
