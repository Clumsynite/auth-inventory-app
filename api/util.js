import { url } from "./index";

export const ping = async () => {
  try {
    return await fetch(`${url}`);
  } catch (error) {
    console.error(error);
  }
};

export const usernameExists = async (username) => {
  try {
    const response = await fetch(`${url}/util/check-username/${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default { ping, usernameExists };
