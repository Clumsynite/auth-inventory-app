import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = { user: null, token: null };

const AuthContext = createContext({
  state: initialState,
  login: ({ user, token }) => {
    user, token;
  },
  logout: () => null,
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
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

const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error("Error reading value", e);
  }
};

const storeObjectData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
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

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing value", e);
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
      const token = await getData("token");
      dispatch({ type: "LOGIN", payload: { user, token } });
    } catch (error) {
      console.error("Error initialising user", error);
    }
  };

  const login = async ({ user, token }) => {
    try {
      await storeObjectData("user", user);
      await storeData("token", token);
      dispatch({ type: "LOGIN", payload: { user, token } });
    } catch (e) {
      console.error("Error login ", e);
    }
  };

  const logout = async () => {
    try {
      await removeItem("user");
      await removeItem("token");
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.error("Error login ", e);
    }
  };

  return <AuthContext.Provider value={{ state, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
