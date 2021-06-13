import { url } from ".";

export const getItems = async (token) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getItem = async (id, token) => {
  try {
    const response = await fetch(`${url}/inventory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addItem = async (item, token) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = async (item, token) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (item, token) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default { getItems, getItem, addItem, updateItem, deleteItem };
