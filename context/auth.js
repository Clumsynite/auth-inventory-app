import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = null;

const AuthContext = createContext({
  user: null,
  login: (user) => user,
  logout: () => null,
});

async function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      await storeData("user", action.payload);
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Error storing data", e);
  }
};

const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading value", e);
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const user = await getObjectData("user");
      dispatch("LOGIN", user);
    } catch (error) {
      console.error("Error initialising user", error);
    }
  };

  return <AuthContext.Provider value={{ user: state }} {...props} />;
}

export { AuthContext, AuthProvider };
