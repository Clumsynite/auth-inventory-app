import { url } from "./index";

export const login = async (user) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const logout = async (token) => {
  try {
    const response = await fetch(`${url}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default { login, logout };
