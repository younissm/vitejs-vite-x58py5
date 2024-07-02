import CookieServices from "./CookieServices";
import { axiosInstance } from "../api/axios.config.js";

export const getUsersList = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`);
    return data;
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw error;
  }
};

export const getMyUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async ({ id, body }) => {
  try {
    const { data } = await axiosInstance.put(`/users/${id}`, body, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
